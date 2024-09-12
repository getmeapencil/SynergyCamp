import express from "express";
import * as controller from "./controller.js";
import { checkAuthenticated } from "../../middlewares/checkAuthenticated.js";

const router = express.Router();

router.post("/",  controller.createRoom);
router.get("/",  controller.getRooms);

export default router;
