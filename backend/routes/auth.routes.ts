import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.route('/').post(authController.login);

export default router;
