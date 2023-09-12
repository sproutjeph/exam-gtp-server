import { Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../../utils/ErrorHandler";
import UserModel from "../../model/user/user";
import redisClient from "../../utils/redis";
import { TypedRequest } from "../../utils/types";

interface IUpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

export const updateUserPassword = CatchAsyncError(
  async (req: TypedRequest, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdateUserPassword;

      if (!oldPassword || !newPassword) {
        throw new BadRequestError("plaese enter old and new password");
      }

      const user = await UserModel.findById(req.user?._id).select("+password");
      if (user?.password === undefined) {
        throw new BadRequestError("Invalid user");
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        throw new UnauthenticatedError("Invalid old password");
      }

      user.password = newPassword;
      await user.save();

      await redisClient.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
