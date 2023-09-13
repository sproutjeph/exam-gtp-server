import { Redis } from "ioredis";
import { REDIS_URL } from "../config/server.config";

const redis = () => {
  if (REDIS_URL) {
    console.log("Redis connected");
    return REDIS_URL;
  }

  throw new Error("Redis not connected");
};

const redisClient = new Redis(redis());

export default redisClient;
