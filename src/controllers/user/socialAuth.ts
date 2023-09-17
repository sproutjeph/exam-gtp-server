import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import UserModel from "../../model/user/user";
import { sendToken } from "../../utils/jwt";
import { BadRequestError } from "../../utils/ErrorHandler";

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
