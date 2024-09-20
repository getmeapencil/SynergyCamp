import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();

router.get("/", checkJWT, controller.getInvites);
router.post("/accept", checkJWT, controller.acceptInvite);
router.post("/reject", checkJWT, controller.rejectInvite);

export default router;
