import axios from "axios";
import { fal } from "@fal-ai/client";
import {
  deleteCacheKeys,
  setGenerationProgress,
  type GenerationJobPayload,
  type GenerationJobStatus,
} from "@repo/queue";
import type { Job } from "bullmq";
import db from "@repo/db";
import { enhancePrompt } from "./enhancePrompt.js";
import { createUploadUrl } from "./storage.js";

const markProgress = async (
  jobId: string,
  status: GenerationJobStatus,
  step: string,
  progress: number,
  imageUrl?: string,
  thumbnailId?: string,
  error?: string
) => {
  await Promise.all([
    setGenerationProgress({
      jobId,
      status,
      step,
      progress,
      imageUrl,
      thumbnailId,
      error,
    }),
    db.generationJob.update({
      where: { id: jobId },
      data: {
        status,
        progress,
        ...(imageUrl ? { resultUrl: imageUrl } : {}),
        ...(thumbnailId ? { thumbnailId } : {}),
        ...(error ? { errorMessage: error } : {}),
      },
    }),
  ]);
};

export const processGenerationJob = async (job: Job<GenerationJobPayload>) => {
  const { jobId, userId, basicPrompt, imageUrls, isPublic } = job.data;

  try {
    await db.generationJob.update({
      where: { id: jobId },
      data: {
        status: "started",
        startedAt: new Date(),
      },
    });
    await markProgress(jobId, "started", "Starting generation", 10);

    await markProgress(jobId, "enhancing_prompt", "Enhancing prompt", 25);
    const enhancedPromptResponse = await enhancePrompt(basicPrompt, imageUrls);
    if (!enhancedPromptResponse) {
      throw new Error("Failed to enhance prompt: empty response");
    }

    const { prompt: enhancedPrompt } = JSON.parse(enhancedPromptResponse) as {
      prompt?: string;
    };
    if (!enhancedPrompt) {
      throw new Error("Failed to parse enhanced prompt");
    }

    await db.generationJob.update({
      where: { id: jobId },
      data: { enhancedPrompt },
    });
    await markProgress(jobId, "generating", "Generating thumbnail with AI", 55);

    fal.config({ credentials: process.env.FAL_API_KEY });
    const falModel =
      imageUrls.length > 0 ? "fal-ai/nano-banana-2/edit" : "fal-ai/nano-banana-pro";
    const response = await fal.subscribe(falModel, {
      input: {
        prompt: enhancedPrompt,
        num_images: 1,
        aspect_ratio: "16:9",
        output_format: "png",
        safety_toleranc: "4",
        resolution: "1K",
        ...(imageUrls.length > 0 ? { image_urls: imageUrls } : {}),
      },
    });

    const generatedUrl = response.data?.images?.[0]?.url;
    if (!generatedUrl) {
      throw new Error("AI generation failed or returned no output URL");
    }

    await markProgress(jobId, "uploading", "Downloading generated image", 75);
    const imageResponse = await fetch(generatedUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download generated image: ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const key = `thumbnails/generations/${Date.now()}-${Math.floor(Math.random() * 1000)}.jpeg`;
    const { signedUrl, publicUrl } = await createUploadUrl(key, "image/jpeg");

    await markProgress(jobId, "uploading", "Uploading to cloud storage", 85);
    await axios.put(signedUrl, imageBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });

    await markProgress(jobId, "saving", "Saving thumbnail", 95);
    const createdThumbnail = await db.$transaction(async (tx) => {
      const thumbnail = await tx.thumbnails.create({
        data: {
          creatorID: userId,
          link: publicUrl,
          prompt: enhancedPrompt,
          isPublic,
        },
      });

      if (imageUrls.length > 0) {
        await tx.thumbnailReferenceImage.createMany({
          data: imageUrls.map((url) => ({
            url,
            thumbnailId: thumbnail.id,
          })),
        });
      }

      await tx.generationJob.update({
        where: { id: jobId },
        data: {
          status: "completed",
          progress: 100,
          resultUrl: publicUrl,
          thumbnailId: thumbnail.id,
          completedAt: new Date(),
        },
      });

      return thumbnail;
    });

    await setGenerationProgress({
      jobId,
      status: "completed",
      step: "Complete",
      progress: 100,
      imageUrl: publicUrl,
      thumbnailId: createdThumbnail.id,
    });
    await deleteCacheKeys(
      `thumbs:user:${userId}:page:1`,
      "thumbs:public:first-page:15",
      "homepage:latest-thumbnails"
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown generation error";
    const maxAttempts = job.opts.attempts ?? 1;
    const isFinalAttempt = job.attemptsMade + 1 >= maxAttempts;

    if (isFinalAttempt) {
      const [, refundedUser] = await db.$transaction([
        db.generationJob.update({
          where: { id: jobId },
          data: {
            status: "failed",
            progress: 100,
            errorMessage,
            completedAt: new Date(),
          },
        }),
        db.user.update({
          where: { id: userId },
          data: { credits: { increment: 1 } },
          select: { email: true },
        }),
      ]);
      await deleteCacheKeys(`credits:email:${refundedUser.email}`);

      await setGenerationProgress({
        jobId,
        status: "failed",
        step: "Error",
        progress: 100,
        error: errorMessage,
      });
    } else {
      await setGenerationProgress({
        jobId,
        status: "started",
        step: "Retrying generation",
        progress: 50,
        error: errorMessage,
      });
    }

    throw error;
  }
};
