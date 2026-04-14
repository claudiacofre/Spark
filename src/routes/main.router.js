import { Router } from "express";
import appRouter from "./app.router.js";
import authRouter from "./auth.router.js";
import sparkRouter from "./spark.router.js";

const router = Router();

router.use("/", appRouter); // Inicio
router.use("/", authRouter); // Perfil y Configuracion de la cuenta
router.use("/", sparkRouter); // Publicaciones y Detalle de Post

export default router;