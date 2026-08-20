import { Router } from 'express';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import cmsRoutes from './cmsRoutes';
import serviceRoutes from './serviceRoutes';
import leadRoutes from './leadRoutes';
import clientRoutes from './clientRoutes';
import projectRoutes from './projectRoutes';
import testimonialRoutes from './testimonialRoutes';
import blogRoutes from './blogRoutes';
import auditRoutes from './auditRoutes';
import reportRoutes from './reportRoutes';
import fileRoutes from './fileRoutes';
import notificationRoutes from './notificationRoutes';

const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    agency: 'Options IT Ltd',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: [
      'Server-Side Tracking (SST)',
      'Meta Pixel & CAPI',
      'Google Tag Manager Setup',
      'GA4 Ecommerce Tracking',
      'Meta Ads Management',
      'Google Ads Management',
      'Google Merchant Center Fix'
    ]
  });
});

// Interactive API Documentation endpoint
apiRouter.get('/docs', (req, res) => {
  res.status(200).json({
    name: 'Options IT Ltd - Agency Backend REST API',
    version: '1.0.0',
    baseUrl: '/api/v1',
    authentication: 'Bearer <JWT_TOKEN>',
    roles: ['Super Admin', 'Admin', 'Editor', 'Client'],
    endpoints: {
      auth: [
        { method: 'POST', path: '/api/v1/auth/login', desc: 'Login with email and password' },
        { method: 'POST', path: '/api/v1/auth/register', desc: 'Register a new user' },
        { method: 'POST', path: '/api/v1/auth/forgot-password', desc: 'Send reset password link' },
        { method: 'GET', path: '/api/v1/auth/profile', desc: 'Get logged in user profile (Auth)' },
        { method: 'POST', path: '/api/v1/auth/change-password', desc: 'Change password (Auth)' },
        { method: 'GET', path: '/api/v1/auth/users', desc: 'List all users (Super Admin/Admin)' }
      ],
      dashboard: [
        { method: 'GET', path: '/api/v1/dashboard/stats', desc: 'Get analytics, visitors, leads, revenue, and charts' },
        { method: 'POST', path: '/api/v1/dashboard/record-view', desc: 'Increment website visitor telemetry' }
      ],
      cms: [
        { method: 'GET', path: '/api/v1/cms/content', desc: 'Get public website content (Hero, About, Stats, Contact)' },
        { method: 'PUT', path: '/api/v1/cms/homepage', desc: 'Update homepage CMS content (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/cms/about', desc: 'Update about page CMS content (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/cms/contact', desc: 'Update contact info CMS (Admin/Editor)' }
      ],
      services: [
        { method: 'GET', path: '/api/v1/services', desc: 'List all services' },
        { method: 'GET', path: '/api/v1/services/:slug', desc: 'Get single service by slug' },
        { method: 'POST', path: '/api/v1/services', desc: 'Create new service (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/services/:id', desc: 'Update service (Admin/Editor)' },
        { method: 'DELETE', path: '/api/v1/services/:id', desc: 'Delete service (Admin)' }
      ],
      leads: [
        { method: 'POST', path: '/api/v1/leads', desc: 'Public lead submission form' },
        { method: 'GET', path: '/api/v1/leads', desc: 'Get leads with status filter (Admin/Editor)' },
        { method: 'PATCH', path: '/api/v1/leads/:id/status', desc: 'Update lead status (New -> Converted)' },
        { method: 'POST', path: '/api/v1/leads/:id/notes', desc: 'Add internal CRM note to lead' },
        { method: 'PATCH', path: '/api/v1/leads/:id/assign', desc: 'Assign lead to engineer/team' }
      ],
      clients: [
        { method: 'GET', path: '/api/v1/clients', desc: 'Get all clients (Admin/Editor)' },
        { method: 'GET', path: '/api/v1/clients/portal/me', desc: 'Client Portal view (Client)' },
        { method: 'POST', path: '/api/v1/clients', desc: 'Create new client (Admin)' },
        { method: 'PUT', path: '/api/v1/clients/:id', desc: 'Update client profile (Admin/Editor)' },
        { method: 'PATCH', path: '/api/v1/clients/:id/progress', desc: 'Update tracking milestones (0-100%)' }
      ],
      projects: [
        { method: 'GET', path: '/api/v1/projects', desc: 'Get published case studies' },
        { method: 'POST', path: '/api/v1/projects', desc: 'Create new case study (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/projects/:id', desc: 'Update case study (Admin/Editor)' },
        { method: 'DELETE', path: '/api/v1/projects/:id', desc: 'Delete case study (Admin)' }
      ],
      testimonials: [
        { method: 'GET', path: '/api/v1/testimonials', desc: 'Get approved client reviews' },
        { method: 'POST', path: '/api/v1/testimonials/submit', desc: 'Submit a new review' },
        { method: 'GET', path: '/api/v1/testimonials/all', desc: 'Get all reviews (Admin)' },
        { method: 'PUT', path: '/api/v1/testimonials/:id', desc: 'Update review status (Admin)' }
      ],
      blogs: [
        { method: 'GET', path: '/api/v1/blogs', desc: 'Get published articles' },
        { method: 'POST', path: '/api/v1/blogs', desc: 'Publish article (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/blogs/:id', desc: 'Edit article (Admin/Editor)' }
      ],
      audits: [
        { method: 'POST', path: '/api/v1/audits', desc: 'Submit Free Store Tracking Audit' },
        { method: 'GET', path: '/api/v1/audits', desc: 'List audit requests (Admin/Editor)' },
        { method: 'PUT', path: '/api/v1/audits/:id', desc: 'Update audit diagnosis (Admin)' }
      ],
      reports: [
        { method: 'GET', path: '/api/v1/reports', desc: 'List reports (Auth)' },
        { method: 'POST', path: '/api/v1/reports', desc: 'Upload new client report (Admin/Editor)' }
      ],
      files: [
        { method: 'POST', path: '/api/v1/files/upload', desc: 'Upload file / PDF / Image' }
      ],
      notifications: [
        { method: 'GET', path: '/api/v1/notifications', desc: 'Get system notifications (Auth)' },
        { method: 'PATCH', path: '/api/v1/notifications/:id/read', desc: 'Mark notification as read' },
        { method: 'POST', path: '/api/v1/notifications/dispatch', desc: 'Dispatch custom WhatsApp/Email' }
      ]
    }
  });
});

// Module Subroutes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/cms', cmsRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/leads', leadRoutes);
apiRouter.use('/clients', clientRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/testimonials', testimonialRoutes);
apiRouter.use('/blogs', blogRoutes);
apiRouter.use('/audits', auditRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/files', fileRoutes);
apiRouter.use('/notifications', notificationRoutes);

export default apiRouter;
