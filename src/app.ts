import analyticsRouter from "./routes/analyticsRoute";
import { ErrorMiddleware } from "./middleware/error";
import questionRouter from "./routes/questionRoute";
import subjectRouter from "./routes/subjectRoute";
import openAIRouter from "./routes/openAIChat";
import userRouter from "./routes/userRoute";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://exam-gpt.vercel.app"],
    credentials: true,
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
// app.use(bodyParser.json());

app.use(
  "/api/v1",
  userRouter,
  analyticsRouter,
  questionRouter,
  subjectRouter,
  openAIRouter
);

app.use(ErrorMiddleware);

export default app;
