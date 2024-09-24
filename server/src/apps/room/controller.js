import { RoomModel } from "../../models/room.js";

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

    const room = await RoomModel.findById(roomId);
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

export const editPomodoro = async ({ pomodoroType, timezone, roomId }) => {
  try {
    const room = await RoomModel.findById(roomId);
    room.pomodoro = { pomodoroType, timezone };

    await room.save();
  } catch (e) {
    console.log(e);
  }
};
