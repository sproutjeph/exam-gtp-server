import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { OPENAI_API_KEY } from "@/config/server.config";
import { BadRequestError } from "@/utils/ErrorHandler";
import { Configuration, OpenAIApi } from "openai";
import { Request, Response } from "express";

export const generateChatCompletion = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  const { message } = req.body;
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  if (!message) {
    throw new BadRequestError("Question is Empty");
  }
  if (!config.apiKey) {
    throw new BadRequestError("NO Open AI key");
  }
  try {
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: ["role", message],
    });

    res.status(200).json({
      message: chatResponse.data.choices[0].message,
    });
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});
