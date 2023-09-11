import subjectRouter from "./routes/subject/subjectRoute";
import questionRouter from "./routes/question/questionRoute";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user/userRoute";
import compression from "compression";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.use(express.json());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
// app.use(bodyParser.json());
// app.use(cookieParser());

app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/users", userRouter);

app.use(ErrorMiddleware);

export default app;
