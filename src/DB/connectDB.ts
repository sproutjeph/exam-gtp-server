import mongoose from "mongoose";

export async function connectDb(URI: string) {
  mongoose.connect(URI);
}
