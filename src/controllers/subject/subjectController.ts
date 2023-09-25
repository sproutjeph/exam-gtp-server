import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import SubjectModel from "@/model/subject/subjectModel";
import { BadRequestError } from "@/utils/ErrorHandler";
import { Request, Response } from "express";

export const getAllSubjects = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const subjects = await SubjectModel.find({});

    res.status(201).json({ message: "successfull", data: subjects });
  } catch (error) {
    throw new BadRequestError(`${error}`);
  }
});

export const getSubjectByExamName = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { examName } = req.params;

    const subjects = await SubjectModel.find({
      exam: { $regex: examName, $options: "i" },
    });

    res.status(201).json({ message: "successfull", data: subjects });
  } catch (error) {
    throw new BadRequestError(`${error}`);
  }
});
