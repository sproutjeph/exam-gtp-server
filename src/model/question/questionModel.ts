import mongoose, { Schema, Document, Model } from "mongoose";

interface IQuestionOptions {
  a: string;
  b: string;
  c: string;
  d: string;
  e?: string;
}
interface IReportQuestion extends Document {
  userId: string;
  report: string;
  reportReply: string;
}
export interface IQuestion extends Document {
  correctOption?: string;
  examType: string;
  examYear: string;
  subject: string;
  image?: string;
  options: IQuestionOptions;
  question: string;
  solution?: string;
  questionReports?: IReportQuestion[];
  uploadedBy?: string;
  section?: string;
}

const reportQuestSchema = new Schema<IReportQuestion>({
  userId: {
    type: String,
  },
  report: {
    type: String,
  },
  reportReply: {
    type: String,
  },
});

const questionSchema = new Schema<IQuestion>(
  {
    correctOption: {
      type: String,
    },
    examType: {
      type: String,
      required: true,
    },
    examYear: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    options: {
      a: {
        type: String,
        required: true,
      },
      b: {
        type: String,
        required: true,
      },
      c: {
        type: String,
        required: true,
      },
      d: {
        type: String,
        required: true,
      },
      e: {
        type: String,
      },
    },
    question: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
    },
    section: {
      type: String,
    },
    questionReports: {
      type: [reportQuestSchema],
    },
    uploadedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create and export the Mongoose model using the mainSchema
const QuestionModel: Model<IQuestion> =
  mongoose.models.QuestionDataModal ||
  mongoose.model("Question", questionSchema);

export default QuestionModel;
