import { InviteModel } from "../../models/invite.js";
import { RoomModel } from "../../models/room.js";
import { UserModel } from "../../models/user.js";

export const createRoom = async (req, res) => {
  try {
    const user = req.user;

    const { name, description, timezone } = req.body;
    const room = await RoomModel.create({
      name,
      description,
      createdBy: user._id,
      members: [{ userId: user._id, role: "admin" }],
      pomodoro: {
        pomodoroType: "25-5",
        timezone: timezone,
      },
    });
    res.json(room);
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await RoomModel.findById(roomId).populate("members.userId");
    // check if user temp banned
    const user = req.user;
    const banned = room.temporaryBanned.find((ban) => ban.user.toString() === user._id.toString());
    if (banned) {
      return res.status(401).json({ message: "You are temporarily banned from this room}" });
    }
    res.json(room);
  } catch (e) {
    console.log(e);
  }
};

export const getRooms = async (req, res) => {
  try {
    const user = req.user;
    const rooms = await RoomModel.find({ "members.userId": user?._id });
    for (let room of rooms) {
      if (room.temporaryBanned && room.temporaryBanned.length > 0) {
        room.temporaryBanned = room.temporaryBanned.filter((ban) => {
          return ban.banEndTime > Date.now();
        });
        await room.save();
      }
    }
    res.json(rooms);
  } catch (e) {
    console.log(e);
  }
};

export const editPomodoro = async ({ pomodoroType, timezone, roomId }) => {
  try {
    const room = await RoomModel.findById(roomId);
    room.pomodoro = { pomodoroType, timezone };

    await room.save();
  } catch (e) {
    console.log(e);
  }
};
export const updateRoom = async (req, res) => {
  const user = req.user;
  const { roomId } = req.params;
  const { name, description } = req.body;
  try {
    const room = await RoomModel.findOne({ _id: roomId, "members.userId": user?._id });
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    const members = room.members;
    // if the user is not an admin, return
    const isAdmin = members.find((member) => member.userId.toString() === user._id.toString()).role === "admin";
    if (!isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    room.name = name;
    room.description = description;
    await room.save();
    res.json(room);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Room not found" });
  }
};

export const getRole = async (userId, roomId) => {
  try {
    const room = await RoomModel.findById(roomId);
    const member = room?.members.find((member) => member.userId.toString() === userId.toString());
    return member?.role;
  } catch (e) {
    console.log(e);
  }
};

export const editRoomProfile = async (req, res) => {
  const { roomProfile, roomId } = req.body;
  const { roomName, roomDescription, roomAvatar } = roomProfile;
  try {
    const room = await RoomModel.findById(roomId);
    room.name = roomName;
    room.description = roomDescription;
    room.avatar = roomAvatar;
    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const RoomId = req.params.roomId;
    console.log(RoomId, "server param");
    const data = await RoomModel.findByIdAndDelete(RoomId);
    const inviteDelete = await InviteModel.deleteMany({ roomId: RoomId });
    if (!data || !inviteDelete) {
      return res.json("Room deletion failed ");
    }
    res.send("Room deleted successfully");
  } catch (error) {
    console.log("error", error);
  }
};

export const changeUserRole = async (req, res) => {
  const { userId, roomId, role } = req.body;
  try {
    const room = await RoomModel.findById(roomId).populate("members.userId");
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    if (!role || !userId) {
      return res.status(400).json({ message: "Role or userId not found" });
    }
    room.members = room.members.map((member) => {
      if (member.userId?._id.toString() === userId.toString()) {
        member.role = role;
      }
      return member;
    });
    await room.save();
    res.json(room);
  } catch (e) {
    console.log(e);
  }
};
export const tempBanUserRoom = async ({ userId, roomId, banEndTime }) => {
  try {
    let room = await RoomModel.findById(roomId);
    if (!room) {
      return;
    }
    // if(room.temporaryBanned.map((mem)=>mem.user).includes(userId)){
    //   return
    // }
    console.log(banEndTime, "banDuration");
    room.temporaryBanned.push({ user: userId, banEndTime: banEndTime });
    // // remove temporary ban after banDuration
    // room.temporaryBanned=room.temporaryBanned.filter((ban) => {
    //   return ban.banEndTime < Date.now();
    // });
    await room.save();
  } catch (e) {
    console.log(e);
  }
};
export const removeUserFromRoom = async ({ userId, roomId }) => {
  try {
    console.log(userId, roomId, "mai mileha");
    const room = await RoomModel.findById(roomId);
    console.log(room, room.members);
    room.members = room.members.filter((member) => member.userId.toString() !== userId.toString());
    // delete invite of the user
    await InviteModel.deleteOne({ invitee: userId, roomId: roomId });

    await room.save();
  } catch (e) {
    console.log(e);
  }
};

export const leaveRoomPermanetly = async (req, res) => {
  const { roomId, memberId } = req.body;

  try {
    const room = await RoomModel.findById(roomId);
    if (memberId === room.createdBy.toString()) {
      return res.json("Admin cannot delete his own room ");
    }
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.members = room.members.filter((member) => member.userId.toString() !== memberId);
    await room.save();

    res.status(200).json({ message: "Member removed successfully", room });
  } catch (error) {
    console.error("Error removing member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
