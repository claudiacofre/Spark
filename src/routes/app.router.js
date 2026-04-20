import { Router } from 'express';
import { getStatus } from '../controllers/app.controller.js';

const router = Router();

router.use('/status', getStatus); // Status técnico (JSON)

export default router;