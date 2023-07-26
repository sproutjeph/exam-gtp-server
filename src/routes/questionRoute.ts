import express from "express";
import {
  getAllQuestions,
  getQuestionsbyQeury,
} from "../controllers/questionController";

const router = express.Router();

router.route("/").get(getAllQuestions);
router.route("/").post(getQuestionsbyQeury);

export default router;
