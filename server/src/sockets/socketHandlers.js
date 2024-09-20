import socketRegistry from "./socketRegistry.js";
import { invite } from "../apps/invite/controller.js";
import { v4 as uuidv4 } from "uuid";

const registerSocketHandlers = (io, socket) => {
  // Handle room joining
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.user._id} joined room: ${roomId}`);

    const message = {
      _id: uuidv4(),
      text: `${socket.user.name} joined the room!`,
      notification: true,
    };
    io.to(roomId).emit("incoming-message", message);
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

  socket.on("send-message", async ({ message, roomId }) => {
    const user = socket.user;
    message._id = uuidv4();

    message.user = {
      _id: user._id,
      name: user.name,
      picture: user.picture,
    };

    io.to(roomId).emit("incoming-message", message);
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket disconnected`);
    }
  });
};

export default registerSocketHandlers;
