import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser, getUserWithSparks, registerWithWelcomeSpark } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.put('/:id', updateUser);    // Ruta para modificar
router.delete('/:id', deleteUser); // Ruta para borrar
router.post('/register', registerWithWelcomeSpark); // Para registrar un usuario nuevo (POST)
router.get('/users', getAllUsers); // Para ver a todos los usuarios (GET)
router.get('/users/:username/sparks', getUserWithSparks); // Para ver a un usuario y sus publicaciones (GET)

export default router;