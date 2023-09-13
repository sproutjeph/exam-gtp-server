import express from "express";
import { uploadQuestion } from "../../controllers/question/uploadQuestion";
// import { authorizeRoles, isAuthenticated } from "../../middleware/auth";

const router = express.Router();

router.post("/upload-question", uploadQuestion);

// router.route("/").get(getAllQuestions);
// router.route("/:examType/:examYear/:subject").get(getQuestionsbyQeury);

export default router;
