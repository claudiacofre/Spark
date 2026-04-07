import { Router } from 'express';
import { getIndex, getStatus, postSpark, getSparks } from '../controllers/sparkController.js';

const router = Router();

// Rutas de navegación y API conectadas a sus controladores
router.get('/', getIndex); // / Renderiza el HTML (Paso los datos reales a la vista .hbs)
router.get('/status', getStatus); // Status técnico 
router.get('/sparks', getSparks); // Devuelve el JSON que busca script.js
router.post('/sparks', postSpark); // Crea la chispa


// Próximamente
// router.get('/feed', getFeed);  
// router.get('/post', getPost);  
// router.post('/profile', getProfile);
// router.post('/settings', getSettings);



export default router;





