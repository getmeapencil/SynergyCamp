import express from "express";
import userRouter from "./user/index.js";
import roomRouter from "./room/index.js";
import authRouter from "./auth/index.js";
import usersRouter from "./users/index.js";
import inviteRouter from "./invite/index.js";
import taskRouter from "./task/index.js"
import historyRouter from "./history/index.js";
const apiRouter = express.Router();

apiRouter.use("/room", roomRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/invite", inviteRouter);
apiRouter.use("/task",taskRouter)
apiRouter.use("/history", historyRouter);
export default apiRouter;
