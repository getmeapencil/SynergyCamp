import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"], // Possible statuses
      default: "pending", // Default status
      required: true,
    },
    invitee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room", // Reference to the Room model (assuming it's an ObjectId)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  },
);

export const InviteModel = mongoose.model("invite", inviteSchema);
