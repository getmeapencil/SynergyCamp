import { HistoryModel } from "../../models/history.js";
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
