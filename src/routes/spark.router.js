import { Router } from 'express';
import { getSparks, postSpark, updateSpark, deleteSpark } from '../controllers/spark.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/', authRequired, getSparks);     // GET /api/sparks Devuelve el JSON que busca script.js
router.post('/publish', authRequired, postSpark);    // POST /api/sparks // Postear en el muro
router.put("/:id", authRequired, updateSpark); 
router.delete("/:id", authRequired, deleteSpark); 



export default router;
