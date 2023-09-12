import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { getUserById } from "../../services/user.services";
import { IUser } from "../../model/user/user";

interface TypedRequest extends Request {
  user: IUser;
}
export const getUserInfo = CatchAsyncError(async function (
  req: TypedRequest,
  res: Response
) {
  try {
    const userId = req.user?._id;

    getUserById(userId, res);
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
