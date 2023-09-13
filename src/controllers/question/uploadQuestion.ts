import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import QuestionModel, { IQuestion } from "../../model/question/questionModel";
import SubjectModel, { ISubject } from "../../model/subject/subjectModel";
import { BadRequestError } from "../../utils/ErrorHandler";
import { Request, Response } from "express";

export const uploadQuestion = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const question: IQuestion = req.body;
    if (
      !question.question ||
      !question.subject ||
      !question.examType ||
      !question.examYear
    ) {
      throw new BadRequestError("Please Enter all the required fields");
    }

    const questionExists = await QuestionModel.findOne({
      question: { $regex: new RegExp(question.question) },
    });

    if (questionExists) {
      throw new BadRequestError("Question already exists");
    }

    const newQuestion = await QuestionModel.create(question);

    const newSubject = {
      name: question.subject,
      exam: question.examType,
      examYears: [{ examYear: Number(question.examYear), isActive: true }],
    } as ISubject;

    const existingsubject: any = await SubjectModel.findOne({
      name: { $regex: new RegExp(newSubject.name, "i") },
      exam: { $regex: new RegExp(newSubject.exam, "i") },
    });

    if (existingsubject) {
      existingsubject.examYears?.push({
        examYear: question.examYear,
        isActive: true,
      });
      await existingsubject.save();
    } else {
      await SubjectModel.create(newSubject);
    }

    res.status(201).json({ message: "created", data: newQuestion });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
