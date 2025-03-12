import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

let redisClient:any = null;

export async function getRedisClient() {
    if (!redisClient) {
        console.log("creating new redis client for worker")
        redisClient = createClient({
        url: process.env.REDIS_URL
      });
      await redisClient.connect();
      console.log("new redis client created for worker")
    }
    return redisClient;
}