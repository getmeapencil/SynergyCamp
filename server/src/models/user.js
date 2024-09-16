import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken:{
      type:String
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("user", userSchema);
