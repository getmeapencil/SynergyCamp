import express from "express";
const router = express.Router();
import { googleAuth, logout, refreshToken } from "./controller.js";

router.post("/google", googleAuth);
router.get("/logout", logout);
router.get("/refresh", refreshToken);

export default router;
