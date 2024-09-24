import socketRegistry from "./socketRegistry.js";
import { invite } from "../apps/invite/controller.js";
import { editPomodoro } from "../apps/room/controller.js";
import { v4 as uuidv4 } from "uuid";
import { getRole } from "../apps/room/controller.js";

const users={}

const registerSocketHandlers = (io, socket) => {
  // Handle room joining
  socket.on("join-room", async ({ roomId }) => {
    socket.join(roomId);
    const role = await getRole(socket.user._id, roomId);
    if (users[roomId]) {
      if(users[roomId].map((user)=>user._id.toString()).includes(socket.user._id.toString())){
        return
      }
      users[roomId].push({
        _id: socket.user._id,
        name: socket.user.name,
        role: role,
        picture: socket.user.picture,
      });
    } else {
      users[roomId] = [
        {
          _id: socket.user._id,
          name: socket.user.name,
          role: role,
          picture: socket.user.picture,
        },
      ];
    }

    const message = {
      _id: uuidv4(),
      text: `${socket.user.name} joined the room!`,
      notification: {
        type: "joining-room",
      },
      user: {
        _id: socket.user._id,
      },
    };
    io.to(roomId).emit("user-status", users[roomId]);
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

  socket.on("edit-pomodoro", async ({ pomodoroType, timezone, roomId }) => {
    const message = {
      _id: uuidv4(),
      text: `Pomodoro set to ${pomodoroType}, ${timezone}`,
      notification: {
        type: "edit-pomodoro",
      },
      user: {
        _id: socket.user._id,
      },
    };
    await editPomodoro({ pomodoroType, timezone, roomId });
    io.to(roomId).emit("edit-pomodoro", { pomodoroType, timezone });
    io.to(roomId).emit("incoming-message", message);
  });

  socket.on("leave-room", ({roomId}) => {
    users[roomId] = users[roomId]?.filter((user) => {
      return user._id.toString() !== socket.user._id.toString();
    });
    io.to(roomId).emit("user-status", users[roomId]);
  });
  socket.on("disconnecting", () => {
    const rooms = Array.from(socket.rooms); // Get the rooms the user was in
    rooms.forEach((room) => {
      const message = {
        _id: uuidv4(),
        text: `${socket.user.name} left the room!`,
        notification: {
          type: "leaving-room",
        },
        user: {
          _id: socket.user._id,
        },
      };
      users[room] = users[room]?.filter((user) => {
        return user._id.toString() !== socket.user._id.toString();
      });
      socket.to(room).emit("user-status", users[room]);
      socket.to(room).emit("incoming-message", message);
    });
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket disconnected`);
    }
  });
};

export default registerSocketHandlers;
