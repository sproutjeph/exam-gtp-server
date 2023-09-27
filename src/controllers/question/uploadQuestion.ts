import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import QuestionModel, { IQuestion } from "@/model/question/questionModel";
import SubjectModel, { ISubject } from "@/model/subject/subjectModel";
import { BadRequestError } from "@/utils/ErrorHandler";
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

    await SubjectModel.findOneAndUpdate(
      {
        name: { $regex: new RegExp(newSubject.name, "i") }, // Case-insensitive search
        exam: { $regex: new RegExp(newSubject.exam, "i") }, // Case-insensitive search
        "examYears.examYear": { $ne: Number(question.examYear) },
      },
      {
        $addToSet: {
          examYears: {
            $each: [{ examYear: Number(question.examYear), isActive: true }],
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json({ message: "created", data: newQuestion });
  } catch (error: any) {
    console.log(error.codeName);
    if (error.codeName === "DuplicateKey") {
      // if the duplicate key error is found, then return a success message because the question was created but the examYears array was not updated
      res.status(201).json({ message: "created" });
    }
    throw new BadRequestError(`${error.message}`);
  }
});
