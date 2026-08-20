import { Router } from 'express';
import { serviceController } from '../controllers/serviceController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Get all services & get single service
router.get('/', serviceController.getAllServices);
router.get('/:slug', serviceController.getServiceBySlug);

// Admin/Editor: Create, Update, Delete
router.post('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), serviceController.createService);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), serviceController.updateService);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), serviceController.deleteService);

export default router;
