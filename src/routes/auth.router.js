import { Router } from 'express';
import { registerUser, loginAPI, logoutAPI } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginAPI);
router.post('/logout', logoutAPI);

export default router;