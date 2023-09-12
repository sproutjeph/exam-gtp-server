import { Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { UnauthenticatedError } from "../../utils/ErrorHandler";
import redisClient from "../../utils/redis";
// import { redis } from "../../utils/redis";

export const logoutUser = CatchAsyncError(async function (
  req: any,
  res: Response
) {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    const userId = req.user?._id || "";
    redisClient.del(userId);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    throw new UnauthenticatedError(`${error.message}`);
  }
});
