import { Request, Response } from "express";
import Question from "../../model/question/questionsModal";
import Subject from "../../model/subject/subjectModal";

export async function getAllQuestions(req: Request, res: Response) {
  try {
    const questions = await Question.find({});

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}

export async function getQuestionsbyQeury(req: Request, res: Response) {
  const examType = req.params.examType;
  const examYear = req.params.examYear;
  const subject = req.params.subject;

  console.log(examType, examYear, subject);

  try {
    const questions = await Question.find({
      examType: { $regex: new RegExp(examType, "i") },
      examYear: examYear,
      subject: { $regex: new RegExp(subject, "i") },
    });

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}

export async function uploadQuestions(req: Request, res: Response) {
  const question = req.body;

  try {
    const newQuestion = await Question.create(question);

    const subject = question.subject;
    const examType = question.examType;
    const examYear = question.examYear;

    const newSubject = {
      name: subject,
      exam: examType,
      examYears: [{ examYear: examYear, isActive: true }],
    };

    const existingsubject: any = await Subject.find({
      exam: { $regex: examType, $options: "i" },
      subject: { $regex: new RegExp(subject, "i") },
    });
    if (existingsubject) {
      existingsubject.examYears.push({ examYear: examYear, isActive: true });
      existingsubject.save();
    } else {
      await Subject.create(newSubject);
    }

    res.status(201).json({ message: "created", data: newQuestion });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}
