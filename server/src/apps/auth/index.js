import express from 'express';
const router = express.Router();
import controller from './controller.js';


router.post('signup', controller.signup);
router.post('signin', controller.login);

export default router;