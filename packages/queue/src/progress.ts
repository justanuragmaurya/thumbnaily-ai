import { getRedisConnection } from "./redis";
import type { GenerationProgress } from "./types";

const PROGRESS_TTL_SECONDS = 60 * 60 * 24;

export const generationProgressKey = (jobId: string) =>
  `generation:progress:${jobId}`;

export const setGenerationProgress = async (
  progress: GenerationProgress,
  ttlSeconds = PROGRESS_TTL_SECONDS
) => {
  await getRedisConnection().set(
    generationProgressKey(progress.jobId),
    JSON.stringify(progress),
    "EX",
    ttlSeconds
  );
};

export const getGenerationProgress = async (jobId: string) => {
  const value = await getRedisConnection().get(generationProgressKey(jobId));

  if (!value) {
    return null;
  }

  return JSON.parse(value) as GenerationProgress;
};
