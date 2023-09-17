import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { TypedRequest } from "../../utils/types";
import UserModel from "../../model/user/user";
import { Response } from "express";

export const getApiUseageCount = CatchAsyncError(
  async (req: TypedRequest, res: Response) => {
    try {
      const userId = req.user?._id;

      const user = await UserModel.findById(userId);
      if (!user) {
        throw new BadRequestError("User not found");
      }
      const apiUseageCount = user?.apiUseageCount;

      res.status(200).json({
        success: true,
        apiUseageCount,
      });
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
