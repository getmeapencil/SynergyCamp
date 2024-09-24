import mongoose from "mongoose";

// Define a schema for the members of a room
const MemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "member"], // Possible roles
    default: "member", // Default role
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now, // Timestamp when the user joined the room
  },
});

// Define the schema for a room
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Room name is required
    unique: true, // Room names should be unique
    trim: true, // Remove whitespace from beginning and end
  },
  description: {
    type: String,
    default: "", // Optional room description
    trim: true,
  },
  temporaryBanned: {
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    banEndTime: { type: Date },
  },
  permanentBanned: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  pomodoro: {
    pomodoroType: {
      type: String,
      enum: ["25-5", "50-10"],
      default: "25-5",
    },
    timezone: {
      type: String,
    },
  },
  members: [MemberSchema], // Array of members with their roles
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the room was created
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model who created the room
    required: true,
  },
});
export const RoomModel = mongoose.model("room", RoomSchema);
