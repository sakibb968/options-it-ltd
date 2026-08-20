// API client for Options IT Ltd Backend

const API_BASE = '/api/v1';

export const apiClient = {
  getToken: () => localStorage.getItem('options_it_token') || '',
  setToken: (token: string) => localStorage.setItem('options_it_token', token),
  getUser: () => {
    try {
      const u = localStorage.getItem('options_it_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },
  setUser: (user: any) => localStorage.setItem('options_it_user', JSON.stringify(user)),
  logout: () => {
    localStorage.removeItem('options_it_token');
    localStorage.removeItem('options_it_user');
  },

  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('options_it_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });
    } catch (networkErr: any) {
      throw new Error(`Unable to reach server. Please check your network connection (${networkErr.message || 'Offline'}).`);
    }

    let data: any = {};
    const rawText = await response.text();
    if (rawText && rawText.trim().length > 0) {
      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        console.warn(`Non-JSON response from ${endpoint}:`, rawText.slice(0, 150));
        data = { message: `Server returned unexpected format (${response.status}: ${response.statusText})` };
      }
    } else {
      data = {};
    }

    if (!response.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with HTTP status ${response.status}`;
      throw new Error(errorMsg);
    }
    return data;
  },

  // Auth
  login: (credentials: any) => apiClient.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: any) => apiClient.request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => apiClient.request('/auth/profile'),
  changePassword: (data: any) => apiClient.request('/auth/change-password', { method: 'POST', body: JSON.stringify(data) }),
  getUsers: () => apiClient.request('/auth/users'),

  // Dashboard Stats
  getDashboardStats: () => apiClient.request('/dashboard/stats'),
  recordPageView: () => apiClient.request('/dashboard/record-view', { method: 'POST' }),

  // CMS
  getCmsContent: () => apiClient.request('/cms/content'),
  updateHomepageCms: (data: any) => apiClient.request('/cms/homepage', { method: 'PUT', body: JSON.stringify(data) }),
  updateAboutCms: (data: any) => apiClient.request('/cms/about', { method: 'PUT', body: JSON.stringify(data) }),
  updateContactCms: (data: any) => apiClient.request('/cms/contact', { method: 'PUT', body: JSON.stringify(data) }),

  // Services
  getServices: (status?: string) => apiClient.request(`/services${status ? `?status=${status}` : ''}`),
  createService: (data: any) => apiClient.request('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => apiClient.request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: string) => apiClient.request(`/services/${id}`, { method: 'DELETE' }),

  // Leads CRM
  getLeads: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return apiClient.request(`/leads?${params.toString()}`);
  },
  submitLead: (data: any) => apiClient.request('/leads', { method: 'POST', body: JSON.stringify(data) }),
  updateLeadStatus: (id: string, status: string) => apiClient.request(`/leads/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  addLeadNote: (id: string, noteText: string) => apiClient.request(`/leads/${id}/notes`, { method: 'POST', body: JSON.stringify({ noteText }) }),
  assignLead: (id: string, assignedTo: string) => apiClient.request(`/leads/${id}/assign`, { method: 'PATCH', body: JSON.stringify({ assignedTo }) }),
  deleteLead: (id: string) => apiClient.request(`/leads/${id}`, { method: 'DELETE' }),

  // Clients & Client Portal
  getClients: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return apiClient.request(`/clients?${params.toString()}`);
  },
  createClient: (data: any) => apiClient.request('/clients', { method: 'POST', body: JSON.stringify(data) }),
  updateClient: (id: string, data: any) => apiClient.request(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateTrackingProgress: (id: string, milestones: any) => apiClient.request(`/clients/${id}/progress`, { method: 'PATCH', body: JSON.stringify({ milestones }) }),
  getClientPortalMe: () => apiClient.request('/clients/portal/me'),

  // Case Studies
  getProjects: () => apiClient.request('/projects'),
  createProject: (data: any) => apiClient.request('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) => apiClient.request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: string) => apiClient.request(`/projects/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => apiClient.request('/testimonials/all'),
  createTestimonial: (data: any) => apiClient.request('/testimonials/submit', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: any) => apiClient.request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) => apiClient.request(`/testimonials/${id}`, { method: 'DELETE' }),

  // Blogs CMS
  getBlogs: () => apiClient.request('/blogs/admin/all'),
  createBlog: (data: any) => apiClient.request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: any) => apiClient.request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) => apiClient.request(`/blogs/${id}`, { method: 'DELETE' }),

  // Free Audit Requests
  submitAudit: (data: any) => apiClient.request('/audits', { method: 'POST', body: JSON.stringify(data) }),
  getAudits: (status?: string) => apiClient.request(`/audits${status ? `?status=${status}` : ''}`),
  updateAudit: (id: string, data: any) => apiClient.request(`/audits/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAudit: (id: string) => apiClient.request(`/audits/${id}`, { method: 'DELETE' }),

  // Reports
  getReports: (clientId?: string) => apiClient.request(`/reports${clientId ? `?clientId=${clientId}` : ''}`),
  createReport: (data: any) => apiClient.request('/reports', { method: 'POST', body: JSON.stringify(data) }),
  deleteReport: (id: string) => apiClient.request(`/reports/${id}`, { method: 'DELETE' }),

  // Notifications
  getNotifications: () => apiClient.request('/notifications'),
  markNotificationRead: (id: string) => apiClient.request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () => apiClient.request('/notifications/mark-all-read', { method: 'POST' }),
  dispatchNotification: (data: any) => apiClient.request('/notifications/dispatch', { method: 'POST', body: JSON.stringify(data) }),

  // API Docs
  getApiDocs: () => apiClient.request('/docs')
};
