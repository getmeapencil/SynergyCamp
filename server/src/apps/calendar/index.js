import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();

router.post("/create-event", checkJWT, controller.createEvent);

export default router;
