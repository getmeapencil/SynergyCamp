import socketRegistry from "./socketRegistry.js";
import { invite } from "../apps/invite/controller.js";
import {
  editPomodoro,
  removeUserFromRoom,
  tempBanUserRoom,
  verifyMember,
  getOnlineMembersWithRole,
} from "../apps/room/controller.js";
import { v4 as uuidv4 } from "uuid";
import { trackJoin, trackLeave } from "../apps/history/controller.js";

// const users = {};

const registerSocketHandlers = (io, socket) => {
  // Handle room joining
  socket.on("join-room", async ({ roomId }) => {
    // console.log("join-room before:", socket.rooms);
    const userId = String(socket.user._id);

    if (socket.rooms.has(roomId) || roomId === userId) {
      return;
    }

    const isMember = await verifyMember({ userId, roomId });
    if (!isMember) return;

    // leave every custom room joined
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);

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
        socket.to(room).emit("incoming-message", message);
      }
    });
    socket.join(userId);

    socket.join(roomId);
    // console.log(socket.rooms);

    const activeSockets = await io.in(roomId).fetchSockets();
    let onlineMembers = [];
    activeSockets.map((s) => {
      onlineMembers.push({
        socketid: s.id,
        _id: s.user._id,
        name: s.user.name,
        picture: s.user.picture,
      });
    });
    onlineMembers = await getOnlineMembersWithRole(onlineMembers, roomId);
    io.to(roomId).emit("user-status", onlineMembers);

    const message = {
      _id: uuidv4(),
      text: `${socket.user.name} joined the room!`,
      notification: {
        type: "joining-room",
      },
      user: {
        _id: userId,
      },
    };
    io.to(roomId).emit("incoming-message", message);

    // console.log("join-room after:", socket.rooms);
  });

  // join userId room
  socket.on("join-userId-room", async () => {
    // console.log("join-userId-room before:", socket.rooms);
    const userId = String(socket.user._id);
    const socketRooms = Array.from(socket.rooms);

    // leave every custom room joined (except userId)
    await Promise.all(
      socketRooms.map(async (room) => {
        if (room === socket.id || room === String(socket.user._id)) {
          return;
        }
        socket.leave(room);
        const activeSockets = await io.in(room).fetchSockets();
        let onlineMembers = [];
        activeSockets.map((s) => {
          onlineMembers.push({
            socketid: s.id,
            _id: s.user._id,
            name: s.user.name,
            picture: s.user.picture,
          });
        });
        onlineMembers = await getOnlineMembersWithRole(onlineMembers, room);
        io.to(room).emit("user-status", onlineMembers);

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
        socket.to(room).emit("incoming-message", message);
      }),
    );
    socket.join(userId);
    // console.log("join-userId-room after:", socket.rooms);
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

  // socket.on("leave-room", async ({ roomId }) => {
  //   // console.log("leave room", roomId);
  //   console.log("leave-room before:", socket.rooms);
  //   socket.leave(roomId);

  //   const activeSockets = await io.in(roomId).fetchSockets();
  //   let onlineMembers = [];
  //   activeSockets.map((s) => {
  //     onlineMembers.push({
  //       socketid: s.id,
  //       _id: s.user._id,
  //       name: s.user.name,
  //       picture: s.user.picture,
  //     });
  //   });
  //   onlineMembers = await getOnlineMembersWithRole(onlineMembers, roomId);
  //   io.to(roomId).emit("user-status", onlineMembers);

  //   const message = {
  //     _id: uuidv4(),
  //     text: `${socket.user.name} left the room!`,
  //     notification: {
  //       type: "leaving-room",
  //     },
  //     user: {
  //       _id: socket.user._id,
  //     },
  //   };
  //   socket.to(roomId).emit("incoming-message", message);
  //   console.log("leave-room after:", socket.rooms);
  // });

  socket.on("disconnecting", async () => {
    // console.log("disconnecting before:", socket.rooms);
    const socketRooms = Array.from(socket.rooms);
    await Promise.all(
      socketRooms.map(async (room) => {
        if (room === socket.id || room === String(socket.user._id)) {
          return;
        }
        socket.leave(room);
        const activeSockets = await io.in(room).fetchSockets();
        let onlineMembers = [];
        activeSockets.map((s) => {
          onlineMembers.push({
            socketid: s.id,
            _id: s.user._id,
            name: s.user.name,
            picture: s.user.picture,
          });
        });
        onlineMembers = await getOnlineMembersWithRole(onlineMembers, room);
        io.to(room).emit("user-status", onlineMembers);

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
        socket.to(room).emit("incoming-message", message);
      }),
    );
    // console.log("disconnecting after:", socket.rooms);
  });

  socket.on("disconnect", () => {
    if (socket.user) {
      socketRegistry.remove(socket.user._id, socket);
      console.log(`User ${socket.user._id} socket disconnected`);
    }
  });
};

export default registerSocketHandlers;
