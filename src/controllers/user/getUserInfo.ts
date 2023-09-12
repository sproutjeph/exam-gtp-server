import { Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { getUserById } from "../../services/user.services";
import { TypedRequest } from "../../utils/types";

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
