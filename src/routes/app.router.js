import { Router } from 'express';
import { getIndex, getStatus } from '../controllers/app.controller.js';

const router = Router();

// Rutas de navegación y API conectadas a sus controladores
router.get('/', getIndex); // / Renderiza el HTML (Paso los datos reales a la vista .hbs)
router.get('/status', getStatus); // Status técnico 


export default router;