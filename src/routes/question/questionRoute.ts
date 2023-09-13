import { getAllQuestions } from "../../controllers/question/getAllQuestions";
import { uploadQuestion } from "../../controllers/question/uploadQuestion";
// import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
import express from "express";

const router = express.Router();

router.post("/upload-question", uploadQuestion);
router.get("/get-all-questions", getAllQuestions);
// router.route("/:examType/:examYear/:subject").get(getQuestionsbyQeury);

export default router;
