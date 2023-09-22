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
        examYear: {
          type: Number,
          unique: true,
        },
        isActive: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const SubjectModel: Model<ISubject> =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default SubjectModel;
