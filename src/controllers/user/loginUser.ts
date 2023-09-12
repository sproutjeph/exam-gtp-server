import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError, NotFoundError } from "../../utils/ErrorHandler";
import UserModel from "../../model/user/user";
import { sendToken } from "../../utils/jwt";

interface ILoginBody {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body as ILoginBody;
    if (!email || !password) {
      throw new BadRequestError(`Email and password is required`);
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new BadRequestError(`invalid password`);
    }

    sendToken(user, 200, res);
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
