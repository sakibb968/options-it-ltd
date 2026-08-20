import { Router } from 'express';
import { notificationController } from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Notifications
router.get('/', authenticate, notificationController.getAllNotifications);
router.patch('/:id/read', authenticate, notificationController.markAsRead);
router.post('/mark-all-read', authenticate, notificationController.markAllAsRead);
router.post('/dispatch', authenticate, notificationController.sendCustomNotification);

export default router;
