import {
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
} from "@/config/server.config";
import { IUser } from "@/model/user/user";
import { Response } from "express";
import redisClient from "./redis";
interface ITokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse env variables to integrate with fallback values
const accessTokenExpire = parseInt(ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(REFRESH_TOKEN_EXPIRE || "1200", 10);

//options for cookies
export const accessTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();

  const refreshToken = user.SignRefreshToken();
  // upload session to redis

  await redisClient.set(user._id, JSON.stringify(user) as any);

  // only set secure to true in prod
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
