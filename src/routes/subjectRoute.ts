import express from "express";
import {
  getAllSubjects,
  getSubjectByExamName,
} from "@/controllers/subject/subjectController";

const router = express.Router();

router.get("/get-all-subjects", getAllSubjects);
router.get("/get-subject/:examName", getSubjectByExamName);

export default router;
