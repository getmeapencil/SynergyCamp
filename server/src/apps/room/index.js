import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();

router.post("/", checkJWT, controller.createRoom);
router.get("/", checkJWT, controller.getRooms);
router.post("/edit-room", checkJWT, controller.editRoomProfile);
export default router;
