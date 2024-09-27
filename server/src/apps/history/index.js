import express from "express";
const router = express.Router();
import { getHistoryByRoomId } from "./controller.js";

router.post("/", getHistoryByRoomId);


export default router;
