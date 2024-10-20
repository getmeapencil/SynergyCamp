import socketRegistry from "./socketRegistry.js";
import { invite } from "../apps/invite/controller.js";
import { editPomodoro, removeUserFromRoom, tempBanUserRoom, verifyMember } from "../apps/room/controller.js";
import { v4 as uuidv4 } from "uuid";
import { getRole } from "../apps/room/controller.js";
import { trackJoin, trackLeave } from "../apps/history/controller.js";

// const users = {};

const registerSocketHandlers = (io, socket) => {
  // Handle room joining
  socket.on("join-room", async ({ roomId }) => {
    const isMember = await verifyMember({ userId: socket.user._id, roomId });
    if (!isMember) return;

    // check if user is already in room
    // if (users[roomId]?.map((user) => user._id.toString()).includes(socket.user._id.toString())) {
    //   return;
    // }

    socket.join(roomId);

    // const activeSockets = await io.in(roomId).fetchSockets();
    // console.log(activeSockets.length);

    // const role = await getRole(socket.user._id, roomId);

    // trackJoin({ roomId, userId: socket.user._id });
    // if (users[roomId]) {
    //   if (users[roomId].map((user) => user._id.toString()).includes(socket.user._id.toString())) {
    //     return;
    //   }
    //   users[roomId].push({
    //     socketid: socket.id,
    //     _id: socket.user._id,
    //     name: socket.user.name,
    //     role: role,
    //     picture: socket.user.picture,
    //   });
    // } else {
    //   users[roomId] = [
    //     {
    //       socketid: socket.id,
    //       _id: socket.user._id,
    //       name: socket.user.name,
    //       role: role,
    //       picture: socket.user.picture,
    //     },
    //   ];
    // }

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
    // io.to(roomId).emit("user-status", users[roomId]);
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
    } else {
      io.to(senderId).emit("invite-success");
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

  // socket.on("permanent-ban-user", async ({ userId, roomId }) => {
  //   // get socket io of user from userslist
  //   const userSocket = users[roomId].find((user) => {
  //     return user._id.toString() === userId.toString();
  //   });
  //   const socketId = userSocket.socketid;
  //   const username = userSocket.name;
  //   const message = {
  //     _id: uuidv4(),
  //     text: `${username} has been permanently banned!`,
  //     notification: {
  //       type: "permanent-ban",
  //     },
  //     user: {
  //       _id: socket.user._id,
  //     },
  //   };
  //   io.to(roomId).emit("incoming-message", message);

  //   // remove user from room
  //   io.sockets.sockets.get(socketId).leave(roomId);
  //   // emit banned message to user
  //   io.to(roomId).emit("permanent-banned", { message: "You have been banned from the room", userId: userId });

  //   io.to(socketId).emit("permanent-banned", { message: "You have been banned from the room", userId: userId });

  //   users[roomId] = users[roomId]?.filter((user) => {
  //     return user._id.toString() !== userId.toString();
  //   });
  //   io.to(roomId).emit("user-status", users[roomId]);
  //   // remove user from room members list
  //   await removeUserFromRoom({ userId, roomId });
  // });

  // socket.on("temporary-ban-user", async ({ userId, roomId, banDuration }) => {
  //   const userSocket = users[roomId].find((user) => {
  //     return user._id.toString() === userId.toString();
  //   });
  //   let time = 0;
  //   if (banDuration === "a day") {
  //     time = Date.now() + 86400000;
  //   }
  //   if (banDuration === "a week") {
  //     time = Date.now() + 604800000;
  //   }
  //   if (banDuration === "a month") {
  //     time = Date.now() + 2592000000;
  //   }
  //   await tempBanUserRoom({ userId, roomId, banEndTime: time });
  //   const socketId = userSocket.socketid;
  //   const username = userSocket.name;
  //   const message = {
  //     _id: uuidv4(),
  //     text: `${username} has been temporarily banned`,
  //     notification: {
  //       type: "temperory-ban",
  //     },
  //     user: {
  //       _id: socket.user._id,
  //     },
  //   };
  //   io.to(roomId).emit("incoming-message", message);
  //   io.sockets.sockets.get(socketId).leave(roomId);
  //   io.to(roomId).emit("temporary-banned", { message: "You have been banned from the room", userId: userId });
  //   io.to(socketId).emit("temporary-banned", {
  //     message: "You have been banned from the room",
  //     userId: userId,
  //     banEndTime: banDuration,
  //   });
  //   users[roomId] = users[roomId]?.filter((user) => {
  //     return user._id.toString() !== userId.toString();
  //   });
  //   io.to(roomId).emit("user-status", users[roomId]);
  // });

  socket.on("leave-room", ({ roomId }) => {
    // users[roomId] = users[roomId]?.filter((user) => {
    //   return user._id.toString() !== socket.user._id.toString();
    // });
    console.log("leave room", roomId);
    socket.leave(roomId);
    // io.to(roomId).emit("user-status", users[roomId]);
    // trackLeave({ roomId, userId: socket.user._id });

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
    socket.to(roomId).emit("incoming-message", message);
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
      // if (!users[room]?.includes(socket.user._id)) {
      //   return;
      // }
      // users[room] = users[room]?.filter((user) => {
      //   return user._id.toString() !== socket.user._id.toString();
      // });
      // console.log("leave room 2nd", room);
      // trackLeave({ roomId: room, userId: socket.user._id });
      // socket.to(room).emit("user-status", users[room]);
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
