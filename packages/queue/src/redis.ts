import { Redis } from "ioredis";

const getRedisUrl = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is required");
  }

  return redisUrl;
};

let redisConnection: Redis | undefined;

export const getRedisConnection = () => {
  if (!redisConnection) {
    redisConnection = new Redis(getRedisUrl(), {
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    });
  }

  return redisConnection;
};
