import { RoomModel } from "../../models/room.js";
export const createRoom = async (req, res) => {
    
  console.log(" I cam eldl")
  console.log(req.body);
  try {
    const { name, description } = req.body;
    const room = await RoomModel.create({
      name,
      description,
      createdBy: req.user._id,
      members: [{ userId: req.user._id, role: "admin" }],
    });
    res.json(room);
  } catch (e) {
    console.log(e);
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find({ "members.userId": req.user._id });
    res.json(rooms);
  } catch (e) {
    console.log(e);
  }
};
