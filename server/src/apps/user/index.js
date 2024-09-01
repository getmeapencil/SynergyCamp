import express from 'express';
import * as controller from './controller.js';


const router = express.Router();

router.get('/', controller.getUser);
router.post('/logout', controller.logout);

export default router;