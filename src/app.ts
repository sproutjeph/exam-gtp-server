import compression from "compression";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import subjectRouter from "./routes/subjectRoute";
import questionRouter from "./routes/questionRoute";

const app = express();

app.use(cors());

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
