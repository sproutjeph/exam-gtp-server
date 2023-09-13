import { getAllQuestions } from "../../controllers/question/getAllQuestions";
import { getQuestionsbyQeury } from "../../controllers/question/getQuestionByQuery";
import { uploadQuestion } from "../../controllers/question/uploadQuestion";
// import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
import express from "express";

const router = express.Router();

router.post("/upload-question", uploadQuestion);
router.get("/get-all-questions", getAllQuestions);
router.get("/get-questions/:examType/:examYear/:subject", getQuestionsbyQeury);

export default router;
