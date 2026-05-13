import { getRedisConnection } from "./redis";

export const getJsonCache = async <T>(key: string) => {
  const value = await getRedisConnection().get(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
};

export const setJsonCache = async (
  key: string,
  value: unknown,
  ttlSeconds: number
) => {
  await getRedisConnection().set(key, JSON.stringify(value), "EX", ttlSeconds);
};

export const deleteCacheKeys = async (...keys: string[]) => {
  if (keys.length === 0) {
    return;
  }

  await getRedisConnection().del(...keys);
};
