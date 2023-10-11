import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { BadRequestError } from "@/utils/ErrorHandler";
import { Request, Response } from "express";
import UserModel from "@/model/user/user";
import { sendToken } from "@/utils/jwt";

interface ISocailAuthBody {
  name: string;
  email: string;
  avatar: string;
}

export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const { email, name, avatar } = req.body as ISocailAuthBody;
      const user = await UserModel.findOne({ email });
      if (!user) {
        const newUser = await UserModel.create({
          name,
          email,
          avatar,
          isVerified: true,
        });
        sendToken(newUser, 201, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
