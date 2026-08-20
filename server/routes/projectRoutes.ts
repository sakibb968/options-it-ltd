import { Router } from 'express';
import { projectController } from '../controllers/projectController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Get all case studies & single case study
router.get('/', projectController.getAllProjects);
router.get('/:slug', projectController.getProjectBySlug);

// Admin/Editor: Case study CRUD
router.post('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), projectController.createProject);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), projectController.updateProject);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), projectController.deleteProject);

export default router;
