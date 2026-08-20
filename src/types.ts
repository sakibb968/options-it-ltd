export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  deliverables: string[];
  problemsSolved: string[];
  techStack: string[];
  roiBenefit: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  platform: string;
  timeframe: string;
  summary: string;
  before: {
    dataLoss: string;
    roas: string;
    trackingIssue: string;
    attributionScore: string;
  };
  after: {
    eventMatchQuality: string;
    roas: string;
    revenueUplift: string;
    gmcStatus?: string;
    attributionScore: string;
  };
  solutionDetails: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface LeadFormData {
  fullName: string;
  businessName: string;
  websiteUrl: string;
  whatsappNumber: string;
  services: string[];
  monthlyAdBudget: string;
  notes?: string;
}

export interface TrackingAuditResult {
  score: number;
  grade: 'A+' | 'B' | 'C' | 'Critical';
  estimatedLostDataPct: number;
  identifiedRisks: string[];
  recommendedFixes: string[];
  estimatedMonthlyLostRevenue: number;
}
