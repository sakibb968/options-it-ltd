export type UserRole = 
  | 'Super Admin' 
  | 'super_admin' 
  | 'Admin' 
  | 'admin' 
  | 'Editor' 
  | 'editor' 
  | 'Client' 
  | 'client';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  companyName?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  _id: string;
  serviceName: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  bannerImage: string;
  features: string[];
  pricingStartingAt?: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Converted' | 'Closed';

export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  websiteURL: string;
  serviceRequired: string;
  budget: string;
  message: string;
  status: LeadStatus;
  notes: Array<{ text: string; author: string; createdAt: string }>;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'Pending' | 'Running' | 'Completed';

export interface IClient {
  _id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  servicePlan: string;
  projectStatus: ProjectStatus;
  trackingSetupProgress: {
    dataAudit: boolean;
    gtmContainerConfigured: boolean;
    serverSideCloudProvisioned: boolean;
    capiAndDeduplicationActive: boolean;
    ga4EnhancedEcommerceVerified: boolean;
    gmcFeedApproved: boolean;
    percentComplete: number;
  };
  startDate: string;
  endDate?: string;
  assignedEngineer?: string;
  invoicesCount: number;
  totalPaid: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  _id: string;
  clientName: string;
  projectTitle: string;
  slug: string;
  problem: string;
  solution: string;
  servicesUsed: string[];
  results: string;
  beforeAfterData: {
    beforeMetric: string;
    afterMetric: string;
    roasUplift: string;
    emqScore: string;
  };
  images: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface ITestimonial {
  _id: string;
  clientName: string;
  company: string;
  role?: string;
  photo?: string;
  review: string;
  rating: number;
  platform?: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  author: string;
  readTime: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface IAuditRequest {
  _id: string;
  name: string;
  businessName: string;
  website: string;
  email: string;
  phone: string;
  trackingProblem: string;
  adPlatform: string;
  status: 'pending' | 'reviewed' | 'dispatched';
  technicalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReport {
  _id: string;
  clientId: string;
  clientName: string;
  reportTitle: string;
  reportType: 'Meta Ads' | 'Google Ads' | 'GA4' | 'Tracking Audit';
  reportDate: string;
  fileUrl: string;
  fileSize: string;
  summary: string;
  metrics: {
    spend?: number;
    roas?: number;
    conversions?: number;
    emqScore?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IWebContent {
  _id: string;
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    bannerImage: string;
    statistics: Array<{ label: string; value: string; suffix?: string }>;
    trustBadges: string[];
  };
  aboutPage: {
    companyDescription: string;
    mission: string;
    vision: string;
    coreValues: string[];
  };
  contactInfo: {
    whatsapp: string;
    email: string;
    domain: string;
    address: string;
    supportHours: string;
  };
  updatedAt: string;
}

export interface INotification {
  _id: string;
  type: 'lead' | 'audit' | 'client' | 'system';
  title: string;
  message: string;
  metadata?: Record<string, any>;
  read: boolean;
  createdAt: string;
}
