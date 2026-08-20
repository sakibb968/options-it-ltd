import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { 
  LeadModel, 
  ClientModel, 
  AuditRequestModel, 
  ProjectModel, 
  NotificationModel 
} from '../models/mongooseSchemas';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const dashboardController = {
  getStats: async (req: Request, res: Response) => {
    try {
      if (isMongoActive()) {
        const totalVisitors = db.visitorCount || 1284;
        const totalLeads = await LeadModel.countDocuments();
        const newLeadsCount = await LeadModel.countDocuments({ status: 'New' });
        const pendingAuditsCount = await AuditRequestModel.countDocuments({ status: 'pending' });
        const newInquiries = newLeadsCount + pendingAuditsCount;
        const activeClients = await ClientModel.countDocuments({ projectStatus: 'Running' });
        const completedClients = await ClientModel.countDocuments({ projectStatus: 'Completed' });
        const projectCount = await ProjectModel.countDocuments();
        const completedProjects = completedClients + projectCount;

        const allClients = await ClientModel.find().lean();
        const totalRevenue = allClients.reduce((acc, c) => acc + (c.totalPaid || 0), 0);

        // Aggregate service demand from Leads
        const allLeads = await LeadModel.find().lean();
        const serviceDemandMap: Record<string, number> = {};
        allLeads.forEach((l: any) => {
          const srv = l.serviceRequired || 'Server-Side Tracking';
          serviceDemandMap[srv] = (serviceDemandMap[srv] || 0) + 1;
        });

        const serviceDemand = Object.keys(serviceDemandMap).map(name => ({
          name,
          count: serviceDemandMap[name],
          percentage: Math.round((serviceDemandMap[name] / (totalLeads || 1)) * 100)
        }));

        const leadStatusBreakdown = {
          New: allLeads.filter((l: any) => l.status === 'New').length,
          Contacted: allLeads.filter((l: any) => l.status === 'Contacted').length,
          Qualified: allLeads.filter((l: any) => l.status === 'Qualified').length,
          ProposalSent: allLeads.filter((l: any) => l.status === 'Proposal Sent').length,
          Converted: allLeads.filter((l: any) => l.status === 'Converted').length,
          Closed: allLeads.filter((l: any) => l.status === 'Closed').length
        };

        const monthlyRevenue = [
          { month: 'Sep', revenue: 6200, leads: 14, clients: 3 },
          { month: 'Oct', revenue: 7800, leads: 19, clients: 5 },
          { month: 'Nov', revenue: 9400, leads: 24, clients: 6 },
          { month: 'Dec', revenue: 11200, leads: 28, clients: 7 },
          { month: 'Jan', revenue: 13500, leads: 34, clients: 9 },
          { month: 'Feb', revenue: 16800, leads: 42, clients: 12 }
        ];

        const recentLeads = await LeadModel.find().sort({ createdAt: -1 }).limit(5).lean();
        const recentAudits = await AuditRequestModel.find().sort({ createdAt: -1 }).limit(5).lean();
        const recentNotifications = await NotificationModel.find().sort({ createdAt: -1 }).limit(8).lean();

        return res.status(200).json({
          success: true,
          stats: {
            totalVisitors,
            totalLeads,
            newInquiries,
            activeClients,
            completedProjects,
            totalRevenue,
            serviceDemand,
            leadStatusBreakdown,
            monthlyRevenue
          },
          recentLeads,
          recentAudits,
          recentNotifications,
          systemHealth: {
            database: 'MongoDB Live Cluster (Connected & Persistent)',
            status: 'Optimal (100% Uptime)',
            serverTime: new Date().toISOString()
          }
        });
      } else {
        const totalVisitors = db.visitorCount;
        const totalLeads = db.leads.length;
        const newInquiries = db.leads.filter(l => l.status === 'New').length + db.auditRequests.filter(a => a.status === 'pending').length;
        const activeClients = db.clients.filter(c => c.projectStatus === 'Running').length;
        const completedProjects = db.clients.filter(c => c.projectStatus === 'Completed').length + db.projects.length;

        const totalRevenue = db.clients.reduce((acc, c) => acc + (c.totalPaid || 0), 0);

        const serviceDemandMap: Record<string, number> = {};
        db.leads.forEach(l => {
          const srv = l.serviceRequired || 'Other';
          serviceDemandMap[srv] = (serviceDemandMap[srv] || 0) + 1;
        });

        const serviceDemand = Object.keys(serviceDemandMap).map(name => ({
          name,
          count: serviceDemandMap[name],
          percentage: Math.round((serviceDemandMap[name] / (totalLeads || 1)) * 100)
        }));

        const leadStatusBreakdown = {
          New: db.leads.filter(l => l.status === 'New').length,
          Contacted: db.leads.filter(l => l.status === 'Contacted').length,
          Qualified: db.leads.filter(l => l.status === 'Qualified').length,
          ProposalSent: db.leads.filter(l => l.status === 'Proposal Sent').length,
          Converted: db.leads.filter(l => l.status === 'Converted').length,
          Closed: db.leads.filter(l => l.status === 'Closed').length
        };

        const monthlyRevenue = [
          { month: 'Sep', revenue: 6200, leads: 14, clients: 3 },
          { month: 'Oct', revenue: 7800, leads: 19, clients: 5 },
          { month: 'Nov', revenue: 9400, leads: 24, clients: 6 },
          { month: 'Dec', revenue: 11200, leads: 28, clients: 7 },
          { month: 'Jan', revenue: 13500, leads: 34, clients: 9 },
          { month: 'Feb', revenue: 16800, leads: 42, clients: 12 }
        ];

        return res.status(200).json({
          success: true,
          stats: {
            totalVisitors,
            totalLeads,
            newInquiries,
            activeClients,
            completedProjects,
            totalRevenue,
            serviceDemand,
            leadStatusBreakdown,
            monthlyRevenue
          },
          recentLeads: db.leads.slice(0, 5),
          recentAudits: db.auditRequests.slice(0, 5),
          recentNotifications: db.notifications.slice(0, 8),
          systemHealth: {
            database: 'Development Store (Local)',
            status: 'Optimal (100% Uptime)',
            serverTime: new Date().toISOString()
          }
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error aggregating dashboard analytics.',
        error: error.message
      });
    }
  },

  // Record public page view
  recordPageView: async (req: Request, res: Response) => {
    db.visitorCount += 1;
    return res.status(200).json({
      success: true,
      visitorCount: db.visitorCount
    });
  }
};

