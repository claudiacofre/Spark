import { Router } from 'express';
import { getSparks, postSpark, getFeed, getPostDetail} from '../controllers/spark.controller.js';
const router = Router();


// Rutas de navegación y API conectadas a sus controladores
router.get('/sparks', getSparks); // Devuelve el JSON que busca script.js
router.post('/sparks', postSpark); // Crea la chispa
router.get('/feed', getFeed);  // Ver el Muro
router.post('/publish', postSpark); // Postear en el muro
router.get("/post/:id", getPostDetail);;  // Ver un comentario en especifico

 
export default router;





