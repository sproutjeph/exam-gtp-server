import { Redis } from "ioredis";
import { REDIS_URL } from "../config/server.config";

const redisClient = new Redis(REDIS_URL as string);

export default redisClient;
