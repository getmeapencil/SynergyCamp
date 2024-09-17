import invite from "../models/invite.js";
import socketRegistry from "./socketRegistry.js";

const registerSocketHandlers = (io, socket) => {
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

  // Handle sending an invite by userId
  socket.on("send-invite", async ({ inviteeId, roomId, inviterId }) => {
    console.log("Sending invite to user", inviteeId);
    await invite.create({
      invitee: inviteeId,
      roomId: roomId,
      invitedBy: inviterId,
    });

    // Emit the "receive-invite" event to the invitee's userId room
    io.to(inviteeId).emit("receive-invite", { roomId, inviterId });
    console.log(`Invite sent to user: ${inviteeId} for room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket disconnected`);
    }
  });
};

export default registerSocketHandlers;
