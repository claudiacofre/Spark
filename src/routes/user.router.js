import { Router } from 'express'
import User from '../models/User.js';
import { getAllUsers, updateUser, deleteUser, getUserWithSparks, registerWithWelcomeSpark } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerWithWelcomeSpark); // Para registrar un usuario nuevo (POST)
router.put('/users/:id', updateUser);    // Ruta para modificar
router.delete('/users/:id', deleteUser); // Ruta para borrar
router.get('/users', getAllUsers); // Para ver a todos los usuarios (GET)
router.get('/users/:username/sparks', getUserWithSparks); // Para ver a un usuario y sus publicaciones (GET)

export default router;