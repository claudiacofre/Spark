import { Router } from 'express';

import viewsRouter from './views.router.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import sparkRouter from './spark.router.js';
import appRouter from './app.router.js';

const router = Router();

// VISTAS
router.use('/', viewsRouter);

// API AUTH
router.use('/api/auth', authRouter);

//  API USERS
router.use('/api/users', userRouter);

// API SPARKS
router.use('/api/sparks', sparkRouter);

// STATUS
router.use('/api', appRouter);

export default router;