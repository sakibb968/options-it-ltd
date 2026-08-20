import { Router } from 'express';
import { cmsController } from '../controllers/cmsController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Get website CMS content
router.get('/content', cmsController.getContent);

// Admin/Editor: Update Homepage
router.put('/homepage', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), cmsController.updateHomepage);

// Admin/Editor: Update About Page
router.put('/about', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), cmsController.updateAboutPage);

// Admin/Editor: Update Contact Info
router.put('/contact', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), cmsController.updateContactInfo);

export default router;
