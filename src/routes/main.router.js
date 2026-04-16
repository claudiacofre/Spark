import { Router } from "express";
import appRouter from "./app.router.js";
import authRouter from "./auth.router.js";
import sparkRouter from "./spark.router.js";
import userRouter from './user.router.js';

const router = Router();

router.use("/", appRouter); 
router.use("/", authRouter); 
router.use("/", sparkRouter); 
router.use("/users", userRouter); 

export default router;