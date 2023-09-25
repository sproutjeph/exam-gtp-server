import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "@/utils/ErrorHandler";
import QuestionModel from "@/model/question/questionModel";

export const editQuestion = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const questionData = req.body;
    const { questionId } = req.params;

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      {
        $set: questionData,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      question,
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
