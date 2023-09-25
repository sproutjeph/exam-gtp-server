import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../utils/ErrorHandler";
import { CatchAsyncError } from "./catchAsyncErrors";
import { ACCESS_TOKEN } from "@/config/server.config";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TypedRequest } from "@/utils/types";
import redisClient from "@/utils/redis";

export const isAuthenticated = CatchAsyncError(
  async (req: TypedRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw new UnauthenticatedError("Authentication required ");
    }

    const decoded = jwt.verify(
      accessToken,
      ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      throw new UnauthorizedError("access token is not valid");
    }

    const user = await redisClient.get(decoded.id);

    if (!user) {
      throw new NotFoundError("please login to access this resources");
    }

    req.user = JSON.parse(user);

    next();
  }
);

// validate user role

export const authorizeRoles = (...roles: string[]) => {
  return (req: TypedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!roles.includes(role || "")) {
      throw new UnauthorizedError("you are not authorized");
    }
    next();
  };
};
