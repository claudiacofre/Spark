import { Router } from 'express'
import User from '../models/User.js';
import { getAllUsers, updateUser, deleteUser, getUserWithSparks, getUsersJSON } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers);                // GET /api/users
router.get('/', getUsersJSON);
router.get('/:username/sparks', getUserWithSparks); // GET /api/users/:username/sparks
router.put('/:id', updateUser);             // PUT /api/users/:id
router.delete('/:id', deleteUser);          // DELETE /api/users/:id

export default router;