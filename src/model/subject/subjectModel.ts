import mongoose, { Schema, Document, Model } from "mongoose";

interface IExamYear {
  examYear: number;
  isActive: boolean;
}
export interface ISubject extends Document {
  name: string;
  exam: string;
  examYears: IExamYear[];
}

const subjectSchema = new Schema<ISubject>(
  {
    name: String,
    exam: String,
    examYears: [
      {
        examYear: Number,
        isActive: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const SubjectModel: Model<ISubject> =
  mongoose.models.User || mongoose.model("Subject", subjectSchema);

export default SubjectModel;
