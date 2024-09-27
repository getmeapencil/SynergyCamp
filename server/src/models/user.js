import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    longestStreak: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("user", userSchema);
