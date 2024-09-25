import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model who created the room
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room", // Reference to the Room model who created the room
      required: true,
    },
    title: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = mongoose.model("task", taskSchema);
