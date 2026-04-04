import { Router } from 'express';
import { getIndex, getStatus, postSpark, getSparks } from '../controllers/sparkController.js';

const router = Router();

// Rutas de navegación y API conectadas a sus controladores
router.get('/', getIndex); // / Renderiza el HTML (Paso los datos reales a la vista .hbs)
router.get('/status', getStatus); // Status técnico 
router.get('/sparks', getSparks); // Devuelve el JSON que busca script.js
router.post('/sparks', postSpark); // Crea la chispa

//Proximamente
router.get('/feed', (req, res) => res.render('feed', { sparks: [] })); // Aquí pasaré los datos de Sequelize
router.get('/post', (req, res) => res.render('post'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/settings', (req, res) => res.render('settings'));

export default router;





