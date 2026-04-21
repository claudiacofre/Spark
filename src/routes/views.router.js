import { Router } from 'express';

import { getIndex } from '../controllers/app.controller.js';
import { renderLogin, renderRegister } from '../controllers/auth.controller.js';
import { getProfile, getSettings } from '../controllers/profile.controller.js';
import { getFeed, getPostDetail } from '../controllers/spark.controller.js';

const router = Router();

router.get('/', getIndex); // Vista principal
router.get('/login', renderLogin); // Renderiza la página
router.get('/register', renderRegister); // Registrarse
router.get('/profile', getProfile); // Muestra la página de perfil
router.get('/settings', getSettings); // Muestra la página de ajustes
router.get('/feed', getFeed); // Ver el Muro
router.get('/post/:id', getPostDetail); // Ver un comentario en especifico

export default router;


