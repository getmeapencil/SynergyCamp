import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();
router.get("/:roomId", checkJWT, controller.getRoom);
router.post("/", checkJWT, controller.createRoom);
router.get("/", checkJWT, controller.getRooms);
router.put("/:roomId", checkJWT, controller.updateRoom);
export default router;
