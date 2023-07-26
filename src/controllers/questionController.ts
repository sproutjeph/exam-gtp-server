import express, { Request, Response } from "express";
import Question from "../model/questionsModal";

export async function getAllQuestions(req: Request, res: Response) {
  try {
    // const data = await Subject.find({ exam: { $regex: exam, $options: "i" } });
    const questions = await Question.find({});

    res.status(201).json({ message: "successfull", data: questions });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}

export async function getQuestionsbyQeury(req: Request, res: Response) {
  const { examType, examYear, subject } = req.body;

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
