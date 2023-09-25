import { Request, Response } from "express";
import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { BadRequestError } from "@/utils/ErrorHandler";
import QuestionModel from "@/model/question/questionModel";

export const deleteQuestion = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    const question = QuestionModel.findById({ id });
    if (!question) {
      throw new BadRequestError("Question not found");
    }

    await question.deleteOne({ id });
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
