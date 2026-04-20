import { Router } from 'express';
// Controladores
import { getIndex, getStatus } from '../controllers/app.controller.js';
import { renderLogin, renderRegister, registerUser, loginAPI, logoutAPI } from '../controllers/auth.controller.js';
import { getProfile, getSettings } from "../controllers/profile.controller.js";
import { getSparks, postSpark, getFeed, getPostDetail } from '../controllers/spark.controller.js';


// Routers secundarios (Si decides usarlos)
import userRouter from './user.router.js';

const router = Router();

// --- 1. RUTAS DE NAVEGACIÓN (Vistas HBS) ---
// Estas son las que el usuario escribe en la barra de direcciones
router.get('/', getIndex); 
router.get('/login', renderLogin); 
router.get('/register', renderRegister); 
router.get('/profile', getProfile);  
router.get('/settings', getSettings); 
router.get('/feed', getFeed);  
router.get("/post/:id", getPostDetail);

// --- 2. RUTAS DE API (Lógica y JSON) ---
// Agrupamos todo lo que sea API para que sea fácil de mantener
router.post('/api/auth/register', registerUser); 
router.post('/api/auth/login', loginAPI);
router.post('/api/auth/logout', logoutAPI); // Recuerda si decidiste GET o POST aquí

// Para los sparks (publicar y obtener)
router.post('/api/sparks/publish', postSpark);
router.get('/api/sparks', getSparks);

// Para los usuarios (Usando el router secundario)
// Ahora la ruta será: /api/users
router.use('/api/users', userRouter); 

// Status del servidor (GET simple)
router.get('/api/status', getStatus);

export default router;