import { TaskModel } from "../../models/task.js";
import mongoose from "mongoose";

export const getTaskStatsByRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    if (!roomId) {
      return res.json({ message: "no roomId given" }).status(400);
    }

    // Convert roomId to ObjectId if it's a string
    const roomObjectId = mongoose.Types.ObjectId.createFromHexString(roomId);

    // Aggregation pipeline
    const taskStats = await TaskModel.aggregate([
      // Match tasks by roomId
      { $match: { room: roomObjectId } },

      // Group by user and accumulate total and completed counts
      {
        $group: {
          _id: "$user",
          total: { $sum: 1 },
          completed: { $sum: { $cond: ["$completed", 1, 0] } },
        },
      },

      // Lookup user details (only _id, name, and picture fields)
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      // Format user details and include only required fields
      {
        $project: {
          _id: 0,
          user: {
            $let: {
              vars: { user: { $arrayElemAt: ["$userDetails", 0] } },
              in: {
                _id: "$$user._id",
                name: "$$user.name",
                picture: "$$user.picture",
              },
            },
          },
          total: 1,
          completed: 1,
        },
      },
    ]);

    return res.json({ message: "successfully fetched task stats", data: taskStats }).status(200);
  } catch (err) {
    console.log("getTaskStatsByRoom ~ err:", err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};
