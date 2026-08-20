import mongoose, { Schema, Document, Model } from 'mongoose';

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Super Admin', 'super_admin', 'Admin', 'admin', 'Editor', 'editor', 'Client', 'client'], 
    default: 'Admin' 
  },
  phone: { type: String, default: '' },
  companyName: { type: String, default: '' },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Service Schema
const ServiceSchema = new Schema({
  serviceName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  icon: { type: String, default: 'Activity' },
  bannerImage: { type: String, default: '' },
  features: [{ type: String }],
  pricingStartingAt: { type: Number },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// Lead Schema
const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String },
  websiteURL: { type: String, required: true },
  serviceRequired: { type: String, required: true },
  budget: { type: String, default: '$2,500 - $5,000 / month' },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Closed'],
    default: 'New' 
  },
  notes: [{
    text: { type: String },
    author: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  assignedTo: { type: String }
}, { timestamps: true });

// Client Schema
const ClientSchema = new Schema({
  clientName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  servicePlan: { type: String, required: true },
  projectStatus: { 
    type: String, 
    enum: ['Pending', 'Running', 'Completed'],
    default: 'Running' 
  },
  trackingSetupProgress: {
    dataAudit: { type: Boolean, default: true },
    gtmContainerConfigured: { type: Boolean, default: true },
    serverSideCloudProvisioned: { type: Boolean, default: false },
    capiAndDeduplicationActive: { type: Boolean, default: false },
    ga4EnhancedEcommerceVerified: { type: Boolean, default: false },
    gmcFeedApproved: { type: Boolean, default: false },
    percentComplete: { type: Number, default: 35 }
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  assignedEngineer: { type: String, default: 'Lead Tracking Architect' },
  invoicesCount: { type: Number, default: 1 },
  totalPaid: { type: Number, default: 0 }
}, { timestamps: true });

// Project / Case Study Schema
const ProjectSchema = new Schema({
  clientName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  servicesUsed: [{ type: String }],
  results: { type: String, required: true },
  beforeAfterData: {
    beforeMetric: { type: String },
    afterMetric: { type: String },
    roasUplift: { type: String },
    emqScore: { type: String }
  },
  images: [{ type: String }],
  testimonial: {
    quote: { type: String },
    author: { type: String },
    role: { type: String }
  },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

// Testimonial Schema
const TestimonialSchema = new Schema({
  clientName: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String },
  photo: { type: String },
  review: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  platform: { type: String, default: 'Shopify Plus' },
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' }
}, { timestamps: true });

// Blog Schema
const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  featuredImage: { type: String },
  category: { type: String, required: true },
  tags: [{ type: String }],
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: String, default: 'Options IT Editorial' },
  readTime: { type: String, default: '5 min read' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

// Audit Request Schema
const AuditRequestSchema = new Schema({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  trackingProblem: { type: String, required: true },
  adPlatform: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'dispatched'], default: 'pending' },
  technicalNotes: { type: String }
}, { timestamps: true });

// Report Schema
const ReportSchema = new Schema({
  clientId: { type: String, required: true },
  clientName: { type: String, required: true },
  reportTitle: { type: String, required: true },
  reportType: { 
    type: String, 
    enum: ['Meta Ads', 'Google Ads', 'GA4', 'Tracking Audit'],
    required: true 
  },
  reportDate: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: String, default: '2.4 MB' },
  summary: { type: String },
  metrics: {
    spend: { type: Number },
    roas: { type: Number },
    conversions: { type: Number },
    emqScore: { type: Number }
  }
}, { timestamps: true });

// WebContent Schema
const WebContentSchema = new Schema({
  homepage: {
    heroTitle: { type: String, default: 'Fix Your Tracking. Optimize Your Ads. Scale Your Revenue.' },
    heroSubtitle: { type: String, default: 'We help businesses get accurate data, better ad performance, and measurable growth through advanced tracking solutions.' },
    ctaPrimaryText: { type: String, default: 'Get Free Tracking Audit' },
    ctaSecondaryText: { type: String, default: 'Chat on WhatsApp' },
    bannerImage: { type: String, default: '' },
    statistics: [{
      label: { type: String },
      value: { type: String },
      suffix: { type: String }
    }],
    trustBadges: [{ type: String }]
  },
  aboutPage: {
    companyDescription: { type: String },
    mission: { type: String },
    vision: { type: String },
    coreValues: [{ type: String }]
  },
  contactInfo: {
    whatsapp: { type: String, default: '+8801806301888' },
    email: { type: String, default: 'info@optionitld.com' },
    domain: { type: String, default: 'optionitld.com' },
    address: { type: String, default: 'Dhaka, Bangladesh (Global Remote eCommerce Services)' },
    supportHours: { type: String, default: '24/7 Dedicated Support' }
  }
}, { timestamps: true });

// Notification Schema
const NotificationSchema = new Schema({
  type: { type: String, enum: ['lead', 'audit', 'client', 'system'], default: 'lead' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export const UserModel: Model<any> = mongoose.models.User || mongoose.model('User', UserSchema);
export const ServiceModel: Model<any> = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const LeadModel: Model<any> = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export const ClientModel: Model<any> = mongoose.models.Client || mongoose.model('Client', ClientSchema);
export const ProjectModel: Model<any> = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const TestimonialModel: Model<any> = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const BlogModel: Model<any> = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const AuditRequestModel: Model<any> = mongoose.models.AuditRequest || mongoose.model('AuditRequest', AuditRequestSchema);
export const ReportModel: Model<any> = mongoose.models.Report || mongoose.model('Report', ReportSchema);
export const WebContentModel: Model<any> = mongoose.models.WebContent || mongoose.model('WebContent', WebContentSchema);
export const CMSContentModel: Model<any> = WebContentModel;
export const NotificationModel: Model<any> = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);


