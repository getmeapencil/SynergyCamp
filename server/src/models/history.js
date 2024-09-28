import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room", // Reference to the Room model
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now, // Timestamp when the user joined the room
    required: true,
  },
  leftAt: {
    type: Date, // Timestamp when the user left the room
  },
});

export const HistoryModel = mongoose.model("history", HistorySchema);
