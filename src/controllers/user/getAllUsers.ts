import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { getAllUsersService } from "@/services/user.services";
import { BadRequestError } from "@/utils/ErrorHandler";
import { Response } from "express";

export const getAllUsers = CatchAsyncError(async (res: Response) => {
  try {
    getAllUsersService(res);
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
