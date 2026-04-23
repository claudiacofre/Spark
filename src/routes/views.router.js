import { Router } from 'express';

import { getIndex } from '../controllers/app.controller.js';
import { renderLogin, renderRegister, logoutView } from '../controllers/auth.controller.js';
import { getProfile, getSettings } from '../controllers/profile.controller.js';
import { getFeed, getPostDetail } from '../controllers/spark.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', getIndex); // Vista principal
router.get('/login', renderLogin); // Renderiza la página
router.get('/register', renderRegister); // Registrarse
router.get('/profile', authRequired, getProfile); // Muestra la página de perfil
router.get('/settings', authRequired, getSettings); // Muestra la página de ajustes
router.get('/feed', authRequired, getFeed); // Ver el Muro
router.get('/post/:id', getPostDetail); // Ver un comentario en especifico
router.get("/logout", logoutView);

export default router;


