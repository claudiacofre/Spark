import { Router } from 'express';
import { getSparks, postSpark, getFeed} from '../controllers/spark.controller.js';
const router = Router();


// Rutas de navegación y API conectadas a sus controladores
router.get('/sparks', getSparks); // Devuelve el JSON que busca script.js
router.post('/sparks', postSpark); // Crea la chispa
router.post('/publish', postSpark); // Postear en el muro
 
export default router;





