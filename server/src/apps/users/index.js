import express from "express";
import checkJWT from "../../middlewares/checkAuthenticated.js";
import {getUsers} from "./controller.js" 
const router = express.Router();

router.get("/search", checkJWT, getUsers);

export default router;
