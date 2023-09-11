import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import UserModel, { IUser } from "../../model/user/user";
import jwt, { Secret } from "jsonwebtoken";
import { ACTIVATION_SECRET } from "../../config/server.config";

interface IActivationRequest {
  activationToken: string;
  activationCode: string;
}

export const activateUser = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { activationToken, activationCode } = req.body as IActivationRequest;
    type INewUser = { user: IUser; activationCode: string };
    const newUser: INewUser = jwt.verify(
      activationToken,
      ACTIVATION_SECRET as Secret
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestError(`Invalid Activation code`);
    }
    const { name, email, password } = newUser.user;
    const existsUser = await UserModel.findOne({ email });

    if (existsUser) {
      throw new BadRequestError(`User already exist`);
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
