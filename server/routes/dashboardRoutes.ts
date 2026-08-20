import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Analytics dashboard data (Super Admin, Admin, Editor)
router.get('/stats', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), dashboardController.getStats);

// Record page view (Public)
router.post('/record-view', dashboardController.recordPageView);

export default router;
