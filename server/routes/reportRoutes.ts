import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Reports endpoints
router.get('/', authenticate, reportController.getAllReports);
router.get('/client/:clientId', authenticate, reportController.getClientReports);
router.post('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), reportController.createReport);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), reportController.deleteReport);

export default router;
