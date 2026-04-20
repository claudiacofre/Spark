import { Router } from 'express';
// Importamos los controladores que ya tienes
import { getIndex } from '../controllers/app.controller.js';
import { renderLogin, renderRegister, getProfile, getSettings } from '../controllers/auth.controller.js';
import { getSparks, postSpark, getFeed, getPostDetail } from '../controllers/spark.controller.js';

// IMPORTANTE: Importa también las funciones que PROCESAN los datos (los POST)
import { registerUser, loginAPI, logoutAPI } from '../controllers/auth.controller.js';

const router = Router();

// --- 1. RUTAS DE NAVEGACIÓN (Lo que ves en el navegador) ---
router.get('/', getIndex); 
router.get('/login', renderLogin); 
router.get('/register', renderRegister); 
router.get('/profile', getProfile);  
router.get('/settings', getSettings); 
router.get('/feed', getFeed);  
router.get("/post/:id", getPostDetail);

// --- 2. RUTAS DE API (Lo que hace que los formularios funcionen) ---
// Estas rutas deben coincidir con el 'action' de tus formularios .hbs
router.post('/api/auth/register', registerUser); 
router.post('/api/auth/login', loginAPI);
router.post('/api/auth/logout', logoutAPI);
router.post('/api/sparks/publish', postSpark); // Para publicar desde el feed

export default router;