import { Request, Response } from "express";
import { BadRequestError } from "../../utils/ErrorHandler";
import QuestionModel from "../../model/question/questionModel";

export async function getAllQuestions(req: Request, res: Response) {
  try {
    const questions = await QuestionModel.find({});

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
}
