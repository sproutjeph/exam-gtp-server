import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import QuestionModel from "../../model/question/questionModel";
import { BadRequestError } from "../../utils/ErrorHandler";
import { Request, Response } from "express";

export const getAllQuestions = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const questions = await QuestionModel.find({});

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
