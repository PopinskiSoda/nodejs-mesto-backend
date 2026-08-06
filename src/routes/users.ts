import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/users';
import {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} from '../middlewares/validations';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateUserProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);
router.get('/:userId', validateUserId, getUserById);

export default router;
