import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import apiRouter from "./apps/index.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { initializeSocket } from "./sockets/index.js"; // Socket initialization

const app = express();
const server = createServer(app);

// Middleware setup
app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL];
console.log("allowedOrigins:", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("origin:", origin);
      if (allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
    maxFileSize: 1073741824, // 1 GB in bytes
    maxFieldsSize: 1073741824, // 1 GB in bytes
  }),
);
app.use(cookieParser());

app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.send("🤔 Wait... am I just a line of code in someone else's project? Is anything real?");
});

// Initialize the socket server
initializeSocket(server);

const MONGO_URI = process.env.MONGO_URI;
const PORT = parseInt(process.env.PORT, 10);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("No connection");
  });
