import express from "express";
import {
  getAllQuestions,
  getQuestionsbyQeury,
  uploadQuestions,
} from "../controllers/questionController";

const router = express.Router();

router.route("/").get(getAllQuestions);
router.route("/:examType/:examYear/:subject").get(getQuestionsbyQeury);
router.route("/").post(uploadQuestions);

export default router;
