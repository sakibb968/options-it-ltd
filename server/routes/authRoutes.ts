import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public auth endpoints
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/forgot-password', authController.requestPasswordReset);

// Protected auth endpoints
router.get('/profile', authenticate, authController.getProfile);
router.post('/change-password', authenticate, authController.changePassword);
router.get('/users', authenticate, authorizeRoles('Super Admin', 'Admin'), authController.listUsers);

export default router;
