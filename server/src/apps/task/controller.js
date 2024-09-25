import { RoomModel } from "../../models/room.js";
import { TaskModel } from "../../models/task.js";

export const addTask = async (req, res) => {
  const userId = req.user._id;
  const { title, roomId } = req.body;
  try {
    if (!title) {
      return res.json({ message: "no title given" }).status(400);
    }
    if (!roomId) {
      return res.json({ message: "no roomId given" }).status(400);
    }
    const room = await RoomModel.findById(roomId);
    if (!room) {
      return res.json({ message: "no room present with given Id" }).status(400);
    }
    const task = await TaskModel.create({
      room: roomId,
      title: title,
      user: userId,
      completed: false,
    });
    res.json({ message: "successfully inserted new task", data: task }).status(200);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed, title, completedAt } = req.body;
  try {
    const task = await TaskModel.findById(id);
    if (title) {
      task.title = title;
    }
    if (completed !== undefined) {
      task.completed = completed;
      if (completed) {
        task.completedAt = completedAt;
      }
    }
    await task.save();
    return res.json({ message: "successfully updated  task", data: task }).status(200);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};

export const getTasksByRoom = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user._id;
  try {
    if (!roomId) {
      return res.json({ message: "no roomId given" }).status(400);
    }

    const tasks = await TaskModel.find({ room: roomId, user: userId });
    return res.json({ message: "successfully fetched tasks", data: tasks }).status(200);
  } catch (err) {
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};
export const getTasks = async (req, res) => {
  const userId = req.user._id;
  try {
    console.log("get task");
    let tasks = await TaskModel.find({ user: userId }).populate("room");
    tasks = tasks.map((task) => {
      if (task.room) {
        return { ...task._doc, room: task.room.name, roomId: task.room._id };
      } else {
        return { ...task._doc, room: "", roomId: "" };
      }
    });
    return res.json({ message: "successfully fetched tasks", data: tasks }).status(200);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};

export const deleteTask = async (req, res) => {
  console.log("delete task");
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete(id);
    return res.json({ message: "successfully deleted task" }).status(200);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};
