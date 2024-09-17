import { Server } from "socket.io";
import checkJwtSocketMiddleware from "../middlewares/socketJwt.js";
import registerSocketHandlers from "./socketHandlers.js";
import socketRegistry from "./socketRegistry.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
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
