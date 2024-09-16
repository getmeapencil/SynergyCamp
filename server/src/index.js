import express from "express";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import session from "express-session";
import apiRouter from "./apps/index.js";
import dotenv from "dotenv";
import "./passport.js";
import { Server } from "socket.io";
import invite from "./models/invite.js";
import checkJwtSocketMiddleware from "./middlewares/socketJwt.js";
import socketRegistry from "./utils/socketRegistry.js";
dotenv.config();

const app = express();

const server = createServer(app);

// Middleware setup
app.use(express.json());
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      // const requestOrigin = origin || "Unknown origin";
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
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

app.use("/", apiRouter);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.use(checkJwtSocketMiddleware);
io.on("connection", (socket) => {
  // Handle room joining
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Handle sending a message to a room
  socket.on("send-message", (message) => {
    io.to(message.roomId).emit("receive-message", message);
    console.log(`Message sent to room ${message.roomId}`);
  });
  if (socket.user) {
    socketRegistry.add(socket.user._id, socket);
  }
  // Handle sending an invite by userId
  socket.on("send-invite", async ({ inviteeId, roomId, inviterId }) => {
    console.log("Sending invite to user", inviteeId);
    const inv = invite.create({
      invitee: inviteeId,
      roomId: roomId,
      invitedBy: inviterId,
    });
    // Emit the "receive-invite" event to the invitee's userId room
    io.to(inviteeId).emit("receive-invite", { roomId, inviterId: inviterId });
    console.log(`Invite sent to user: ${inviteeId} for room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
    }
    console.log("[SocketIO] user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("🤔 Wait... am I just a line of code in someone else's project? Is anything real?");
});

export { app };

export default server;
