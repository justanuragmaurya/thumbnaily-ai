import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db";
import { auth } from "@/lib/auth";
import {
  getGenerationProgress,
  deleteCacheKeys,
  getThumbnailGenerationQueue,
  setGenerationProgress,
} from "@repo/queue";

export const runtime = "nodejs";

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: true, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { basicPrompt, image_url, image_urls, isPublic } = await req.json();
    const publicFlag = typeof isPublic === "boolean" ? isPublic : true;

    const imageUrls: string[] = Array.isArray(image_urls)
      ? image_urls.filter((u): u is string => typeof u === "string" && Boolean(u))
      : image_url
        ? [image_url]
        : [];

    if (imageUrls.length > 5) {
      return NextResponse.json(
        { error: true, message: "You can upload up to 5 reference images" },
        { status: 400 }
      );
    }

    if (!basicPrompt) {
      return NextResponse.json(
        { error: true, message: "Prompt is required" },
        { status: 400 }
      );
    }

    const generationJob = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: session.user.email! },
        select: { id: true, credits: true },
      });

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const reservedCredit = await tx.user.updateMany({
        where: {
          id: user.id,
          credits: { gte: 1 },
        },
        data: {
          credits: { decrement: 1 },
        },
      });

      if (reservedCredit.count === 0) {
        throw new ApiError("Insufficient credits, please recharge", 402);
      }

      return tx.generationJob.create({
        data: {
          userId: user.id,
          status: "queued",
          basicPrompt,
          imageUrls,
          isPublic: publicFlag,
          progress: 0,
        },
      });
    });

    await setGenerationProgress({
      jobId: generationJob.id,
      status: "queued",
      step: "Queued",
      progress: 0,
    });
    await deleteCacheKeys(`credits:email:${session.user.email}`);

    try {
      await getThumbnailGenerationQueue().add(
        "generate-thumbnail",
        {
          jobId: generationJob.id,
          userId: generationJob.userId,
          basicPrompt,
          imageUrls,
          isPublic: publicFlag,
        },
        {
          jobId: generationJob.id,
        }
      );
    } catch (error) {
      await db.$transaction([
        db.generationJob.update({
          where: { id: generationJob.id },
          data: {
            status: "failed",
            progress: 100,
            errorMessage: "Failed to enqueue generation job",
            completedAt: new Date(),
          },
        }),
        db.user.update({
          where: { id: generationJob.userId },
          data: { credits: { increment: 1 } },
        }),
      ]);

      await setGenerationProgress({
        jobId: generationJob.id,
        status: "failed",
        step: "Error",
        progress: 100,
        error: "Failed to enqueue generation job",
      });

      throw error;
    }

    return NextResponse.json({ progressId: generationJob.id });
  } catch (e: unknown) {
    console.error("Generation request processing error:", e);
    if (e instanceof ApiError) {
      return NextResponse.json(
        { error: true, message: e.message },
        { status: e.status }
      );
    }

    const errorMessage =
      e instanceof Error ? e.message : "Failed to process request";
    return NextResponse.json(
      { error: true, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const progressId = url.searchParams.get("progressId");

  if (!progressId) {
    return NextResponse.json(
      { error: "Progress ID is required" },
      { status: 400 }
    );
  }

  const progress = await getGenerationProgress(progressId);
  if (progress) {
    return NextResponse.json(progress);
  }

  const generationJob = await db.generationJob.findUnique({
    where: { id: progressId },
    select: {
      id: true,
      status: true,
      progress: true,
      resultUrl: true,
      errorMessage: true,
    },
  });

  if (!generationJob) {
    return NextResponse.json(
      { error: "Invalid or expired progress ID" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    jobId: generationJob.id,
    status: generationJob.status,
    step: generationJob.status,
    progress: generationJob.progress,
    imageUrl: generationJob.resultUrl ?? undefined,
    error: generationJob.errorMessage ?? undefined,
  });
}
