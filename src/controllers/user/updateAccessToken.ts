import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { UnauthenticatedError } from "../../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../config/server.config";
import { accessTokenOptions, refreshTokenOptions } from "../../utils/jwt";
import UserModel, { IUser } from "../../model/user/user";

interface TypedRequest extends Request {
  user: IUser;
}

export const updateAccessToken = CatchAsyncError(async function (
  req: TypedRequest,
  res: Response
) {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(
      refresh_token,
      REFRESH_TOKEN as string
    ) as JwtPayload;
    const message = "could not refresh token";

    if (!decoded) {
      throw new UnauthenticatedError(message);
    }
    const session = await UserModel.findOne(decoded.id);
    if (!session) {
      throw new UnauthenticatedError("please login to access this resources");
    }
    const user = session;
    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN as string, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN as string, {
      expiresIn: "3d",
    });
    req.user = user;
    res.cookie("access_token", accessToken, accessTokenOptions);

    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
    // const redisEXday = 604800; // 7days
    // await redis.set(user._id, JSON.stringify(user), "EX", redisEXday);

    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error: any) {
    throw new UnauthenticatedError(`${error.message}`);
  }
});
