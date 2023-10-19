import { generateChatCompletion } from "@/controllers/openAi/chatCompletion";
import express from "express";
import { isAuthenticated } from "@/middleware/auth";

const router = express.Router();

router.post("/openAI-chat", generateChatCompletion);

export default router;
