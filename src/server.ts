import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
  PORT,
} from "./config/server.config";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "./DB/connectDB";
import http from "http";
import app from "./app";

const server = http.createServer(app);
// "build": "npm-run-all format lint clean && tsc", put this in you package.json file
// cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

async function startServer() {
  await connectDb();
  console.log("Connected to DB");

  server.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
}

startServer();
