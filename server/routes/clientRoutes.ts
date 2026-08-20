import { Router } from 'express';
import { clientController } from '../controllers/clientController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Client Portal endpoint (For authenticated clients to view own project and progress)
router.get('/portal/me', authenticate, clientController.getClientPortalData);

// Admin/Editor Client Management
router.get('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), clientController.getAllClients);
router.get('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), clientController.getClientById);
router.post('/', authenticate, authorizeRoles('Super Admin', 'Admin'), clientController.createClient);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), clientController.updateClient);
router.patch('/:id/progress', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), clientController.updateTrackingProgress);

export default router;
