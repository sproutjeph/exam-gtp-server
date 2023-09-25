import { MONGODB_URI } from "@/config/server.config";
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};
