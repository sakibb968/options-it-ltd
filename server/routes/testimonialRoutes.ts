import { Router } from 'express';
import { testimonialController } from '../controllers/testimonialController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Get approved testimonials
router.get('/', testimonialController.getApprovedTestimonials);
router.post('/submit', testimonialController.createTestimonial);

// Admin: Manage all testimonials
router.get('/all', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), testimonialController.getAllTestimonials);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), testimonialController.updateTestimonial);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), testimonialController.deleteTestimonial);

export default router;
