import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/:userId', updateUserProfile);
router.patch('/:userId/avatar', updateUserAvatar);
export default router;
