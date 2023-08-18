import subjectRouter from "./routes/subject/subjectRoute";
import questionRouter from "./routes/question/questionRoute";
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

export default app;
