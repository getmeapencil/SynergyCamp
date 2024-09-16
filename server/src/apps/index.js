import express from "express";
import userRouter from "./user/index.js";
import roomRouter from "./room/index.js";
import authRouter from "./auth/index.js";
import usersRouter from "./users/index.js";
const apiRouter = express.Router();
apiRouter.use("/room", roomRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
