import { Response } from "express";
import redisClient from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redisClient.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};
