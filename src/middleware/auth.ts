import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import {
  NotFoundError,
  // NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/server.config";
import UserModel, { IUser } from "../model/user/user";

interface TypedRequest extends Request {
  user: IUser;
}

export const isAuthenticated = CatchAsyncError(
  async (req: TypedRequest, res: Response, next: NextFunction) => {
    const { access_token } = req.cookies;

    if (!access_token) {
      throw new UnauthenticatedError("Please login ");
    }

    const decodeed = jwt.verify(
      access_token,
      ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decodeed) {
      throw new UnauthorizedError("access token is not valid");
    }
    console.log(decodeed.id);

    const user = UserModel.findOne(decodeed.id);

    if (!user) {
      throw new NotFoundError("please login to access this resources");
    }

    req.user = user as unknown as IUser;

    next();
  }
);

// validate user role

export const authorizeRoles = (...roles: string[]) => {
  return (req: TypedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      throw new UnauthorizedError("you are not authorized");
    }
    next();
  };
};
