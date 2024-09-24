import { RoomModel } from "../../models/room.js";
import { UserModel } from "../../models/user.js";

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

export const getRoom = async (req, res) => {
  try {
    const user = req.user;
    const { roomId } = req.params;
    const room = await RoomModel.findOne({ _id: roomId, "members.userId": user?._id }).populate("members.userId");
    res.json(room);
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
  try{
    const room = await RoomModel.findById(roomId);
    const member= room.members.find((member) => member.userId.toString() === userId.toString());
    console.log(member);
    return member.role;
  }catch(e){
    console.log(e);
  }

}
;
