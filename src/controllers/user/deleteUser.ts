import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError, NotFoundError } from "../../utils/ErrorHandler";
import UserModel from "../../model/user/user";

export const deleteUser = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const user = UserModel.findById({ id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await user.deleteOne({ id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
