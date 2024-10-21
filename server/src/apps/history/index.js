import express from "express";
const router = express.Router();
import { getHistoryByRoomId, getStreak, getLast7daysHistory } from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

router.post("/", checkJWT, getHistoryByRoomId);
router.get("/streak", checkJWT, getStreak);
router.get("/last7days", checkJWT, getLast7daysHistory);

export default router;
