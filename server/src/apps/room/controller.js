import { RoomModel } from "../../models/room.js";

export const createRoom = async (req, res) => {
  try {
    const user = req.user;

    const { name, description } = req.body;
    const room = await RoomModel.create({
      name,
      description,
      createdBy: user._id,
      members: [{ userId: user._id, role: "admin" }],
    });
    res.json(room);
  } catch (e) {
    console.log(e);
  }
};

export const getRooms = async (req, res) => {
  try {
    const user = req.user;

    const rooms = await RoomModel.find({ "members.userId": user?._id });
    res.json(rooms);
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
