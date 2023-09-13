import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { generateLast12MonthsData } from "../../utils/analyticsGenerator";
import UserModel from "../../model/user/user";

export const getUserAnalytics = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const users = await generateLast12MonthsData(UserModel);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
