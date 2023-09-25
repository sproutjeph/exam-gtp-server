import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { BadRequestError } from "@/utils/ErrorHandler";
import { TypedRequest } from "@/utils/types";
import UserModel from "@/model/user/user";
import redisClient from "@/utils/redis";
import cloudinary from "cloudinary";
import { Response } from "express";

export const updateUserVatar = CatchAsyncError(
  async (req: TypedRequest, res: Response) => {
    try {
      const { avatar } = req.body;
      const userId = req.user?._id;
      const user = await UserModel.findById(userId);

      if (avatar && user) {
        // if user has an vatar already call this
        if (user?.avatar?.public_id) {
          // first delete the old image
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }
      await user?.save();
      await redisClient.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
