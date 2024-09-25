import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();
router.post("/", checkJWT, controller.addTask);
router.patch("/:id", checkJWT, controller.updateTask);
router.get("/:roomId", checkJWT, controller.getTasksByRoom);
router.get("/", checkJWT, controller.getTasks);
router.delete("/:id", checkJWT, controller.deleteTask);
export default router;
