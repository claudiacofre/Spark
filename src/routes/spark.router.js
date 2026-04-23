import { Router } from 'express';
import { authRequired, validateApiToken } from "../middlewares/auth.middleware.js";
import { getSparks, postSpark, updateSpark, deleteSpark } from '../controllers/spark.controller.js';



const router = Router();

router.get('/', authRequired, getSparks);    // Obtener chispas (Usamos authRequired para que solo usuarios logueados vean el feed)
router.post('/publish', authRequired, postSpark);  // Publicar chispa, 'validateApiToken' porque el script.js espera un JSON, no un redireccionamiento
router.put("/:id", validateApiToken, updateSpark);  // Editar
router.delete("/:id", validateApiToken, deleteSpark); // Borrar


export default router;
