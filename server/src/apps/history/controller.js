import { HistoryModel } from "../../models/history.js";
import { UserModel } from "../../models/user.js";
export const getHistoryByRoomId = async (req, res) => {
  try {
    const { roomId } = req.body;
    const history = await HistoryModel.find({ roomId });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get history" });
  }
};

export const getStreak = async (req, res) => {
  try {
    const userId = req.user._id;
    // Get the user's history, sorted by date in descending order
    const history = await HistoryModel.find({ userId }).sort({ joinedAt: -1 });

    if (history.length === 0) {
      return res.status(200).json({ streak: 0 }); // No history, streak is 0
    }

    let streak = 1; // Start with a streak of 1
    let lastDate = new Date(history[0].joinedAt).setHours(0, 0, 0, 0); // Normalize to midnight

    for (let i = 1; i < history.length; i++) {
      const currentDate = new Date(history[i].joinedAt).setHours(0, 0, 0, 0); // Normalize to midnight

      // Check if currentDate is exactly one day before lastDate
      const dayDifference = (lastDate - currentDate) / (1000 * 60 * 60 * 24);
      if (dayDifference === 1) {
        streak += 1;
      } else if (dayDifference > 1) {
        break; // Streak is broken, exit the loop
      }

      lastDate = currentDate; // Update lastDate to the currentDate
    }
    // update user longest streak
    const user = await UserModel.findById(userId);
    if (user.longestStreak < streak) {
      user.longestStreak = streak;
      await user.save();
    }
    if (!user.longestStreak) {
      user.longestStreak = streak;
      await user.save();
    }

    res.status(200).json(streak);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get streak" });
  }
};


export const trackJoin = async ({ roomId, userId }) => {
  try {
    const history = new HistoryModel({
      roomId,
      userId,
      joinedAt: Date.now(),
    });
    await history.save();
  } catch (error) {
    console.error(error);
  }
};

export const trackLeave = async ({ roomId, userId }) => {
  try {
    const history = await HistoryModel.findOne({ roomId, userId }).sort({ joinedAt: -1 });
    if (history && !history.leftAt) {
      history.leftAt = Date.now();
      await history.save();
    }
  } catch (error) {
    console.error(error);
  }
};
