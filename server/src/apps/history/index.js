import express from "express";
const router = express.Router();
import { getHistoryByRoomId, getStreak } from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";
router.post("/", checkJWT, getHistoryByRoomId);
router.get("/streak", checkJWT, getStreak);

export default router;
