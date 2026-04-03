import { Router } from 'express';
import { getIndex, getStatus, postSpark } from '../controllers/sparkController.js';

const router = Router();

// Rutas de navegación y API conectadas a sus controladores
router.get('/', getIndex);
router.get('/status', getStatus);
router.post('/sparks', postSpark);

//Proximamente
router.get('/feed', (req, res) => res.render('feed', { sparks: [] })); // Aquí pasaré los datos de Sequelize
router.get('/post', (req, res) => res.render('post'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/settings', (req, res) => res.render('settings'));

export default router;





