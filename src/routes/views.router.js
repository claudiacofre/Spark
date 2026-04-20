import { Router } from 'express';
import { getIndex } from '../controllers/app.controller.js';
import { renderLogin, renderRegister, getProfile, getSettings, loginAPI } from '../controllers/auth.controller.js';
import { getSparks, postSpark, getFeed, getPostDetail} from '../controllers/spark.controller.js';

const router = Router();

// Rutas de navegación y API conectadas a sus controladores
router.get('/', getIndex); // / Renderiza el HTML (Paso los datos reales a la vista .hbs)
router.get('/login', renderLogin); // Renderiza la págin
router.get('/register', renderRegister); // Registrarse
router.get('/profile', getProfile);  // Muestra la página de perfil
router.get('/settings', getSettings); // Muestra la página de ajustes
router.get('/feed', getFeed);  // Ver el Muro
router.get("/post/:id", getPostDetail);;  // Ver un comentario en especifico

export default router;







