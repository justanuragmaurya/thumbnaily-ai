// api/generate-thumbnail/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import db from "@repo/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { enhancePrompt } from "@/lib/enhancePrompt";
import { auth } from "@/lib/auth";
import { reduceCredit } from "@/lib/credits";
import { fal } from "@fal-ai/client";


interface ProgressData {
  step: string;
  progress: number;
  imageUrl?: string;
  error?: string;
}
const progressStore = new Map<string, ProgressData>();
const updateProgress = (
  progressId: string,
  step: string,
  progress: number,
  imageUrl?: string,
  error?: string
) => {
  progressStore.set(progressId, { step, progress, imageUrl, error });
};

export async function POST(req: NextRequest) {
  const progressId = Math.random().toString(36).substring(7);
  updateProgress(progressId, "Initializing", 0); // Initial state

  try {
    updateProgress(progressId, "Authenticating user", 5);
    const session = await auth();
    if (!session || !session.user?.email) {
      updateProgress(
        progressId,
        "Error",
        0,
        undefined,
        "Authentication failed"
      );
      return NextResponse.json(
        { error: true, message: "Not authenticated", progressId },
        { status: 401 }
      );
    }

    updateProgress(progressId, "Fetching user data", 10);
    const user = await db.user.findFirst({
      where: { email: session.user.email },
    });
    if (!user) {
      updateProgress(progressId, "Error", 10, undefined, "User not found");
      return NextResponse.json(
        { error: true, message: "User not found", progressId },
        { status: 404 }
      );
    }
    if (user.credits <= 0) {
      updateProgress(
        progressId,
        "Error",
        10,
        undefined,
        "Insufficient credits"
      );
      return NextResponse.json(
        {
          error: true,
          message: "Insufficient credits, please recharge",
          progressId,
        },
        { status: 402 }
      );
    }

    const { basicPrompt, image_url } = await req.json();
    if (!basicPrompt) {
      updateProgress(progressId, "Error", 15, undefined, "Prompt is missing");
      return NextResponse.json(
        { error: true, message: "Prompt is required", progressId },
        { status: 400 }
      );
    }

    updateProgress(progressId, "Request accepted", 15);

    (async () => {
      try {
        updateProgress(progressId, "Enhancing prompt", 25);
        console.log("Sending for Prompt Enhancement. Image URL:", image_url);
        const enhancedPromptResponse = await enhancePrompt(
          basicPrompt,
          image_url
        );
        if (!enhancedPromptResponse) {
          throw new Error("Failed to enhance prompt: empty response");
        }
        const { prompt: enhancedContent } = JSON.parse(enhancedPromptResponse);
        if (!enhancedContent) {
          throw new Error("Failed to parse enhanced prompt");
        }
        updateProgress(progressId, "Prompt enhanced", 35);
        console.log("Got the enhanced prompt");

        const input = {
          aspect_ratio: "16:9",
          output_format: "png",
          output_quality: 100,
          disable_safety_checker: true,
          prompt: enhancedContent,
        };

        updateProgress(progressId, "Initializing AI generation", 45);

        if (!process.env.ACCESSKEYID || !process.env.SECRETACCESSKEY) {
          console.error("AWS credentials missing from environment variables.");
          throw new Error(
            "AWS credentials missing. Cannot initialize S3 client."
          );
        }

        fal.config({
          credentials: process.env.FAL_API_KEY
        });

        const s3 = new S3Client({
          region: "ap-south-1",
          credentials: {
            accessKeyId: process.env.ACCESSKEYID!,
            secretAccessKey: process.env.SECRETACCESSKEY!,
          },
        });
        
        const key = `thumbnails/generations/${Math.floor(Math.random() * 1000) + Date.now().toString()}.jpeg`;
        
        const cmd = new PutObjectCommand({
          Bucket: "thumbnaily-storage",
          Key: key,
        });

        updateProgress(progressId, "Preparing cloud storage", 50);
        const signedS3Url = await getSignedUrl(s3, cmd);

        updateProgress(progressId, "Generating thumbnail with AI", 60);
        console.log("Sending to Replicate");
        
        const response = await fal.subscribe("fal-ai/nano-banana-pro", {
          input: {
            prompt: enhancedContent,
            num_images: 1,
            aspect_ratio: "16:9",
            output_format: "png",
            safety_toleranc: "4",
            resolution: "1K"
            },
        });
        
        if(!response || !response.data?.images?.[0]?.url){
          throw new Error("AI generation failed or returned no output URL");
        }  
        updateProgress(progressId, "AI generation complete", 75);

        updateProgress(progressId, "Downloading generated image", 80);
        
        const imageResponse = await fetch(response.data.images[0].url);
        if (!imageResponse.ok)
          throw new Error(
            `Failed to download generated image: ${imageResponse.statusText}`
          );
        const imageBuffer = await imageResponse.arrayBuffer();

        updateProgress(progressId, "Uploading to cloud storage", 85);
        console.log("Sending to S3");
        await axios.put(signedS3Url, imageBuffer, {
          headers: { "Content-Type": "image/jpeg" },
        });
        updateProgress(progressId, "Cloud upload complete", 90);
        console.log("Sent to S3");

        const finalImageUrl = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;
        updateProgress(progressId, "Saving to database", 95);
        console.log("Saving to DB");
        await db.thumbnails.create({
          data: {
            creatorID: user.id,
            link: finalImageUrl,
            prompt: input.prompt,
          },
        });
        await reduceCredit({ email: user.email!, cost: 1 });
        updateProgress(progressId, "Complete", 100, finalImageUrl);
        console.log("Saving to DB done");
      } catch (e: unknown) {
        console.error("Background generation error:", e);
        const errorMessage =
          e instanceof Error ? e.message : "Unknown error during generation";
        updateProgress(progressId, "Error", 100, undefined, errorMessage);
      } finally {
        // Consider how long to keep the final status available for polling
        setTimeout(() => progressStore.delete(progressId), 60000); // e.g., 1 minute
      }
    })(); // Self-invoking async function

    return NextResponse.json({ progressId }); // Return progressId immediately
  } catch (e: unknown) {
    // Catch errors from initial synchronous part
    console.error("Initial request processing error:", e);
    const errorMessage =
      e instanceof Error ? e.message : "Failed to process request";
    // Ensure progressId is available if it was generated
    updateProgress(
      progressId,
      "Error",
      0,
      undefined,
      `Initial error: ${errorMessage}`
    );
    return NextResponse.json(
      { error: true, message: errorMessage, progressId },
      { status: 500 }
    );
  }
}
// Inside route.tsx
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const progressId = url.searchParams.get("progressId");

  if (!progressId) {
    return NextResponse.json(
      { error: "Progress ID is required" },
      { status: 400 }
    );
  }
  if (!progressStore.has(progressId)) {
    return NextResponse.json(
      { error: "Invalid or expired progress ID" },
      { status: 404 }
    );
  }

  const progress = progressStore.get(progressId);
  return NextResponse.json(progress);
}
