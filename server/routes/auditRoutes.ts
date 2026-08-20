import { Router } from 'express';
import { auditController } from '../controllers/auditController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Submit store audit request
router.post('/', auditController.submitAudit);

// Admin/Editor: View & update audits
router.get('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), auditController.getAllAudits);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), auditController.updateAudit);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), auditController.deleteAudit);

export default router;
