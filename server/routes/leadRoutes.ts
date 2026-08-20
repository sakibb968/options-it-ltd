import { Router } from 'express';
import { leadController } from '../controllers/leadController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Submit Lead from Contact / Audit forms
router.post('/', leadController.createLead);

// Admin/Editor: View, Update, Add Notes, Assign, Delete
router.get('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), leadController.getAllLeads);
router.get('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), leadController.getLeadById);
router.patch('/:id/status', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), leadController.updateStatus);
router.post('/:id/notes', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), leadController.addNote);
router.patch('/:id/assign', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), leadController.assignLead);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), leadController.deleteLead);

export default router;
