import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();
router.post("/", checkJWT, controller.createRoom);
router.get("/", checkJWT, controller.getRooms);
router.get("/:roomId", checkJWT, controller.getCurrentRoom);
router.put("/:roomId", checkJWT, controller.updateRoom);
router.post("/edit-room-profile", checkJWT, controller.editRoomProfile);
router.delete("/deleteRoom/:roomId", checkJWT, controller.deleteRoom);
router.post("/change-user-role", checkJWT, controller.changeUserRole);
router.delete("/permanent-leave", checkJWT, controller.leaveRoomPermanetly);
export default router;
