import { Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import UserModel from "../../model/user/user";
import { BadRequestError } from "../../utils/ErrorHandler";
import redisClient from "../../utils/redis";
import { TypedRequest } from "../../utils/types";

interface IUpdataUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: TypedRequest, res: Response) => {
    try {
      const { name, email } = req.body as IUpdataUserInfo;
      const userId = req.user?._id;
      const user = await UserModel.findById(userId);

      if (email && user) {
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
          throw new BadRequestError("Email already exist");
        }

        user.email = email;
      }

      if (name && user) {
        user.name = name;
      }

      await user?.save();

      await redisClient.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
