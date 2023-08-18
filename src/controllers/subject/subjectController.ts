import { Request, Response } from "express";
import Subject from "../../model/subject/subjectModal";

export async function getAllSubject(req: Request, res: Response) {
  try {
    const subjects = await Subject.find({});

    res.status(201).json({ message: "successfull", data: subjects });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error });
  }
}

export async function getExamSubjects(req: Request, res: Response) {
  try {
    const { examName } = req.params;

    const subjects = await Subject.find({
      exam: { $regex: examName, $options: "i" },
    });

    res.status(201).json({ message: "successfull", data: subjects });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}
