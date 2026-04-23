import { Router } from 'express';
import { getAllUsers, updateUser, updateProfile, deleteUser, getUserWithSparks } from '../controllers/user.controller.js';
import { uploadFile } from '../controllers/upload.controller.js';
import { authRequired, validateApiToken } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { upload } from '../middlewares/upload.middleware.js';


const router = Router();

// SOLO ADMIN puede ver y eliminar usuarios
router.get("/", authRequired, requireRole("admin"), getAllUsers);
router.delete("/:id", authRequired, requireRole("admin"), deleteUser);

// USER o ADMIN autenticados
router.get("/:username/sparks", authRequired, getUserWithSparks);
router.put('/:id', authRequired, updateUser); 
router.post('/upload', upload.single('image'), uploadFile);

// Ahora, si alguien intenta subir una foto sin token, recibirá un error 401
router.post('/upload', validateApiToken, upload.single('image'), uploadFile);

router.post('/update', authRequired, updateProfile);

export default router;