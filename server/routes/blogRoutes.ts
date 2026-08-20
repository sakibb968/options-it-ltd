import { Router } from 'express';
import { blogController } from '../controllers/blogController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public: Get published blog posts
router.get('/', blogController.getPublishedBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Admin/Editor: Blog CMS CRUD
router.get('/admin/all', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), blogController.getAllBlogs);
router.post('/', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), blogController.createBlog);
router.put('/:id', authenticate, authorizeRoles('Super Admin', 'Admin', 'Editor'), blogController.updateBlog);
router.delete('/:id', authenticate, authorizeRoles('Super Admin', 'Admin'), blogController.deleteBlog);

export default router;
