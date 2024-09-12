import express from 'express';
import userRouter from './user/index.js';
import roomRouter from './room/index.js';
const apiRouter = express.Router();
apiRouter.use('/room',roomRouter);
apiRouter.use('/user',userRouter);

export default apiRouter;