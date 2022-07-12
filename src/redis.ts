import { createClient } from "redis";
export const redisClient = createClient();

redisClient.on("error", (err: unknown) =>
  console.log("Redis Client Error", err)
);

export async function connectRedis() {
  return await redisClient.connect();
}
