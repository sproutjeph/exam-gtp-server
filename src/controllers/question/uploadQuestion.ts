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
      question: question.question,
    });

    if (questionExists) {
      throw new BadRequestError("Question already exists");
      // return res.status(400).json({
      //   message: "question already exists",
      // });
    }

    const newQuestion = await QuestionModel.create(question);

    const subject = question.subject;
    const examType = question.examType;
    const examYear = question.examYear;

    const newSubject = {
      name: subject,
      exam: examType,
      examYears: [{ examYear: Number(examYear), isActive: true }],
    } as ISubject;

    const existingsubject: any = await SubjectModel.findOne({
      exam: { $regex: examType, $options: "i" },
      subject: { $regex: new RegExp(subject, "i") },
    });
    if (existingsubject) {
      existingsubject.examYears?.push({ examYear: examYear, isActive: true });
      await existingsubject.save();
    } else {
      await SubjectModel.create(newSubject);
    }

    res.status(201).json({ message: "created", data: newQuestion });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
