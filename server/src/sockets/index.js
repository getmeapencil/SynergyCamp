import { Server } from "socket.io";
import checkJwtSocketMiddleware from "../middlewares/socketJwt.js";
import registerSocketHandlers from "./socketHandlers.js";
import socketRegistry from "./socketRegistry.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      maxAge: 86400,
      maxFileSize: 1073741824, // 1 GB in bytes
      maxFieldsSize: 1073741824,
    },
  });

  // Use JWT middleware for Socket authentication
  io.use(checkJwtSocketMiddleware);

  // Register the socket handlers
  io.on("connection", (socket) => {
    if (socket.user) {
      socketRegistry.add(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket connected`);
    }
    registerSocketHandlers(io, socket);
  });

  return io;
};
