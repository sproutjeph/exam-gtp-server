import { Request, Response } from "express";
import QuestionModel from "../../model/question/questionModel";
import { BadRequestError } from "../../utils/ErrorHandler";

export async function getQuestionsbyQeury(req: Request, res: Response) {
  const examType = req.params.examType;
  const examYear = req.params.examYear;
  const subject = req.params.subject;

  console.log(examType, examYear, subject);

  try {
    const questions = await QuestionModel.find({
      examType: { $regex: new RegExp(examType, "i") },
      examYear: examYear,
      subject: { $regex: new RegExp(subject, "i") },
    });

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
}
