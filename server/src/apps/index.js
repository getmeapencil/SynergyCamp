import express from 'express';
const apiRouter = express.Router();
import authRouter from './auth/index.js';

apiRouter.use('/auth', require('./auth'));