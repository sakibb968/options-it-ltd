import { Router, Request, Response } from 'express';
import { authController } from '../controllers/authController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Helper for 405 Method Not Allowed
const methodNotAllowed = (allowedMethods: string[]) => (req: Request, res: Response) => {
  res.setHeader('Allow', allowedMethods.join(', '));
  res.status(405).json({
    success: false,
    message: `HTTP ${req.method} is not allowed on ${req.originalUrl || req.baseUrl + req.path}. Allowed methods: ${allowedMethods.join(', ')}`
  });
};

// Public auth endpoints
router.route('/login')
  .post(authController.login)
  .all(methodNotAllowed(['POST', 'OPTIONS']));

router.route('/register')
  .post(authController.register)
  .all(methodNotAllowed(['POST', 'OPTIONS']));

router.route('/forgot-password')
  .post(authController.requestPasswordReset)
  .all(methodNotAllowed(['POST', 'OPTIONS']));

// Protected auth endpoints
router.route('/profile')
  .get(authenticate, authController.getProfile)
  .all(methodNotAllowed(['GET', 'OPTIONS']));

router.route('/change-password')
  .post(authenticate, authController.changePassword)
  .all(methodNotAllowed(['POST', 'OPTIONS']));

router.route('/users')
  .get(authenticate, authorizeRoles('Super Admin', 'Admin'), authController.listUsers)
  .all(methodNotAllowed(['GET', 'OPTIONS']));

export default router;
