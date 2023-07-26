import express from "express";
import {
  getAllSubject,
  getExamSubjects,
} from "../controllers/subjectController";

const router = express.Router();

router.route("/").get(getAllSubject);
router.route("/:examName").get(getExamSubjects);

export default router;
