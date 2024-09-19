import socketRegistry from "./socketRegistry.js";
import { invite } from "../apps/invite/controller.js";

const registerSocketHandlers = (io, socket) => {
  // Handle room joining
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.user._id} joined room: ${roomId}`);
  });

  // Handle sending a message to a room
  socket.on("send-message", (message) => {
    io.to(message.roomId).emit("receive-message", message);
    console.log(`Message sent to room ${message.roomId}`);
  });

  // Handle sending an invite by userId
  socket.on("send-invite", async ({ emails, roomId }) => {
    const senderId = String(socket.user._id);

    const res = await invite({ emails, roomId, senderId });

    if (res.error) {
      io.to(senderId).emit("invite-error", { error: res.error });
    } else {
      res.successfulInvites?.map((invite) => {
        io.to(invite.invitee).emit("incoming-invite", invite.room);
      });
    }

    if (res.failedInvites?.length) {
      io.to(senderId).emit("invite-error", { failedInvites: res.failedInvites });
    }
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket disconnected`);
    }
  });
};

export default registerSocketHandlers;
