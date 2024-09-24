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
  const { roomProfile, currentRoom } = req.body;
  const { roomName, roomDescription, Avatar } = roomProfile;
  try {
    const updateRoom = await RoomModel.findById(currentRoom);
    updateRoom.name = roomName;
    updateRoom.description = roomDescription;
    updateRoom.Avatar = Avatar;
    const updatedRoom = await updateRoom.save();
    res.json(updatedRoom);
    console.log(updatedRoom);
  } catch (error) {
    console.log(error);
  }
};
