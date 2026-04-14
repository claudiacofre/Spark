import { Router } from 'express';
import { getProfile, getSettings } from '../controllers/auth.controller.js';

const router = Router();

router.get('/profile', getProfile);    
router.get('/settings', getSettings); 


export default router;