import express from "express";
import * as controller from "./controller.js";
import checkJWT from "../../middlewares/checkAuthenticated.js";

const router = express.Router();

router.get("/", checkJWT, controller.getUser);
router.post("/logout", controller.logout);

export default router;
