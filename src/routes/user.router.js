import { Router } from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserWithSparks
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers); // GET /api/users
router.get('/:username/sparks', getUserWithSparks); // GET /api/users/:username/sparks
router.put('/:id', updateUser);  // PUT /api/users/:id
router.delete('/:id', deleteUser); // DELETE /api/users/:id

export default router;