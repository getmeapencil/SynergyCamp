import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();
router.get("/:roomId", checkJWT, controller.getTaskStatsByRoom);
export default router;
