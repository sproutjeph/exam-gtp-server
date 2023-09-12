import { Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { getAllUsersService } from "../../services/user.services";

export const getAllUsers = CatchAsyncError(async (res: Response) => {
  try {
    getAllUsersService(res);
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
