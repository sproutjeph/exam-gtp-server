import { MONGODB_URI, PORT } from "./config/server.config";
import { connectDb } from "./DB/connectDB";
import http from "http";
import app from "./app";

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDb(MONGODB_URI);
    console.log("Connected to DB");

    server.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
