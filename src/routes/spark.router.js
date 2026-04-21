import { Router } from 'express';
import { getSparks, postSpark } from '../controllers/spark.controller.js';

const router = Router();

router.get('/', getSparks);     // GET /api/sparks Devuelve el JSON que busca script.js
router.post('/', postSpark);    // POST /api/sparks // Postear en el muro

export default router;
