import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { ClientModel, ReportModel } from '../models/mongooseSchemas';
import { IClient, ProjectStatus } from '../models/types';
import { sendNotification } from '../services/notificationService';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const clientController = {
  // Get all clients (Admin / Super Admin / Editor)
  getAllClients: async (req: AuthRequest, res: Response) => {
    try {
      const { status, search } = req.query;

      if (isMongoActive()) {
        const query: any = {};
        if (status && typeof status === 'string') {
          query.projectStatus = status;
        }
        if (search && typeof search === 'string') {
          query.$or = [
            { clientName: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { website: { $regex: search, $options: 'i' } }
          ];
        }

        const clients = await ClientModel.find(query).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: clients.length,
          clients
        });
      } else {
        let clients = db.clients;

        if (status && typeof status === 'string') {
          clients = clients.filter(c => c.projectStatus.toLowerCase() === status.toLowerCase());
        }

        if (search && typeof search === 'string') {
          const q = search.toLowerCase();
          clients = clients.filter(c => 
            c.clientName.toLowerCase().includes(q) ||
            c.companyName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.website.toLowerCase().includes(q)
          );
        }

        return res.status(200).json({
          success: true,
          count: clients.length,
          clients
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get Client by ID
  getClientById: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const client = await ClientModel.findById(id).lean();
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found in MongoDB.' });
        }

        const reports = await ReportModel.find({
          $or: [{ clientId: id }, { clientName: (client as any).companyName }]
        }).lean();

        return res.status(200).json({
          success: true,
          client,
          reports
        });
      } else {
        const client = db.clients.find(c => c._id === id);
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found.' });
        }

        const reports = db.reports.filter(r => r.clientId === client._id || r.clientName.toLowerCase() === client.companyName.toLowerCase());

        return res.status(200).json({
          success: true,
          client,
          reports
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create new client (Admin)
  createClient: async (req: AuthRequest, res: Response) => {
    try {
      const { clientName, companyName, email, phone, website, servicePlan, projectStatus, startDate, assignedEngineer, totalPaid } = req.body;

      if (!clientName || !companyName || !email) {
        return res.status(400).json({
          success: false,
          message: 'Client name, company name, and email are required.'
        });
      }

      if (isMongoActive()) {
        const created = await ClientModel.create({
          clientName,
          companyName,
          email: email.toLowerCase(),
          phone: phone || '',
          website: website || '',
          servicePlan: servicePlan || 'Enterprise Server-Side CAPI Setup',
          projectStatus: (projectStatus as ProjectStatus) || 'Running',
          trackingSetupProgress: {
            dataAudit: true,
            gtmContainerConfigured: false,
            serverSideCloudProvisioned: false,
            capiAndDeduplicationActive: false,
            ga4EnhancedEcommerceVerified: false,
            gmcFeedApproved: false,
            percentComplete: 20
          },
          startDate: startDate || new Date().toISOString().split('T')[0],
          assignedEngineer: assignedEngineer || 'Sakib (Senior Tracking Architect)',
          invoicesCount: 1,
          totalPaid: totalPaid ? Number(totalPaid) : 0
        });

        await sendNotification({
          type: 'client',
          title: `Client Onboarded: ${companyName}`,
          message: `${clientName} onboarded under ${servicePlan}. Assigned: ${created.assignedEngineer}`,
          metadata: { clientId: created._id.toString() }
        });

        return res.status(201).json({
          success: true,
          message: 'Client created successfully in MongoDB.',
          client: created
        });
      } else {
        const newClient: IClient = {
          _id: 'cli_' + Math.random().toString(36).substring(2, 9),
          clientName,
          companyName,
          email: email.toLowerCase(),
          phone: phone || '',
          website: website || '',
          servicePlan: servicePlan || 'Enterprise Server-Side CAPI Setup',
          projectStatus: (projectStatus as ProjectStatus) || 'Running',
          trackingSetupProgress: {
            dataAudit: true,
            gtmContainerConfigured: false,
            serverSideCloudProvisioned: false,
            capiAndDeduplicationActive: false,
            ga4EnhancedEcommerceVerified: false,
            gmcFeedApproved: false,
            percentComplete: 20
          },
          startDate: startDate || new Date().toISOString().split('T')[0],
          assignedEngineer: assignedEngineer || 'Sakib (Senior Tracking Architect)',
          invoicesCount: 1,
          totalPaid: totalPaid ? Number(totalPaid) : 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.clients.push(newClient);

        await sendNotification({
          type: 'client',
          title: `Client Onboarded: ${companyName}`,
          message: `${clientName} onboarded under ${servicePlan}. Assigned: ${newClient.assignedEngineer}`,
          metadata: { clientId: newClient._id }
        });

        return res.status(201).json({
          success: true,
          message: 'Client created successfully.',
          client: newClient
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update client details & project status
  updateClient: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { 
        clientName, companyName, email, phone, website, servicePlan, 
        projectStatus, trackingSetupProgress, startDate, endDate, assignedEngineer, totalPaid 
      } = req.body;

      if (isMongoActive()) {
        const client = await ClientModel.findById(id);
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found.' });
        }

        if (clientName !== undefined) client.clientName = clientName;
        if (companyName !== undefined) client.companyName = companyName;
        if (email !== undefined) client.email = email;
        if (phone !== undefined) client.phone = phone;
        if (website !== undefined) client.website = website;
        if (servicePlan !== undefined) client.servicePlan = servicePlan;
        if (projectStatus !== undefined) client.projectStatus = projectStatus;
        if (trackingSetupProgress !== undefined) {
          client.trackingSetupProgress = { ...client.trackingSetupProgress, ...trackingSetupProgress };
        }
        if (startDate !== undefined) client.startDate = startDate;
        if (endDate !== undefined) client.endDate = endDate;
        if (assignedEngineer !== undefined) client.assignedEngineer = assignedEngineer;
        if (totalPaid !== undefined) client.totalPaid = Number(totalPaid);

        await client.save();

        return res.status(200).json({
          success: true,
          message: 'Client record updated in MongoDB.',
          client
        });
      } else {
        const client = db.clients.find(c => c._id === id);
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found.' });
        }

        if (clientName !== undefined) client.clientName = clientName;
        if (companyName !== undefined) client.companyName = companyName;
        if (email !== undefined) client.email = email;
        if (phone !== undefined) client.phone = phone;
        if (website !== undefined) client.website = website;
        if (servicePlan !== undefined) client.servicePlan = servicePlan;
        if (projectStatus !== undefined) client.projectStatus = projectStatus;
        if (trackingSetupProgress !== undefined) client.trackingSetupProgress = { ...client.trackingSetupProgress, ...trackingSetupProgress };
        if (startDate !== undefined) client.startDate = startDate;
        if (endDate !== undefined) client.endDate = endDate;
        if (assignedEngineer !== undefined) client.assignedEngineer = assignedEngineer;
        if (totalPaid !== undefined) client.totalPaid = Number(totalPaid);
        client.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Client record updated.',
          client
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Tracking Milestone Progress (Admin / Technical Editor)
  updateTrackingProgress: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { milestones } = req.body;

      if (isMongoActive()) {
        const client = await ClientModel.findById(id);
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found.' });
        }

        client.trackingSetupProgress = {
          ...client.trackingSetupProgress,
          ...milestones
        };

        let score = 0;
        if (client.trackingSetupProgress.dataAudit) score += 15;
        if (client.trackingSetupProgress.gtmContainerConfigured) score += 20;
        if (client.trackingSetupProgress.serverSideCloudProvisioned) score += 20;
        if (client.trackingSetupProgress.capiAndDeduplicationActive) score += 20;
        if (client.trackingSetupProgress.ga4EnhancedEcommerceVerified) score += 15;
        if (client.trackingSetupProgress.gmcFeedApproved) score += 10;
        client.trackingSetupProgress.percentComplete = score;

        if (score >= 100) {
          client.projectStatus = 'Completed';
        }

        await client.save();

        return res.status(200).json({
          success: true,
          message: `Tracking progress updated to ${score}%.`,
          progress: client.trackingSetupProgress
        });
      } else {
        const client = db.clients.find(c => c._id === id);
        if (!client) {
          return res.status(404).json({ success: false, message: 'Client not found.' });
        }

        client.trackingSetupProgress = {
          ...client.trackingSetupProgress,
          ...milestones
        };

        // Calculate percentage dynamically based on checks
        let score = 0;
        if (client.trackingSetupProgress.dataAudit) score += 15;
        if (client.trackingSetupProgress.gtmContainerConfigured) score += 20;
        if (client.trackingSetupProgress.serverSideCloudProvisioned) score += 20;
        if (client.trackingSetupProgress.capiAndDeduplicationActive) score += 20;
        if (client.trackingSetupProgress.ga4EnhancedEcommerceVerified) score += 15;
        if (client.trackingSetupProgress.gmcFeedApproved) score += 10;
        client.trackingSetupProgress.percentComplete = score;
        client.updatedAt = new Date().toISOString();

        if (score >= 100) {
          client.projectStatus = 'Completed';
        }

        return res.status(200).json({
          success: true,
          message: `Tracking progress updated to ${score}%.`,
          progress: client.trackingSetupProgress
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Client Portal View (Logged in client views own data)
  getClientPortalData: async (req: AuthRequest, res: Response) => {
    try {
      const userEmail = (req.user?.email || '').toLowerCase();
      let client: any = null;
      let clientReports: any[] = [];

      if (isMongoActive()) {
        client = await ClientModel.findOne({ email: userEmail }).lean();
        if (!client) {
          client = await ClientModel.findOne().lean();
        }

        if (client) {
          clientReports = await ReportModel.find({
            $or: [{ clientId: client._id.toString() }, { clientName: client.companyName }]
          }).lean();
        }
      } else {
        client = db.clients.find(c => c.email.toLowerCase() === userEmail);
        if (!client) {
          client = db.clients[0];
        }
        if (client) {
          clientReports = db.reports.filter(r => r.clientId === client?._id || r.clientName.toLowerCase() === client?.companyName.toLowerCase());
        }
      }

      const invoices = [
        { id: 'INV-2026-001', date: '2026-02-01', amount: '$1,500.00', status: 'Paid', service: 'Server-Side Cloud Setup' },
        { id: 'INV-2026-002', date: '2026-02-15', amount: '$1,500.00', status: 'Paid', service: 'Meta CAPI Dual Tagging' },
        { id: 'INV-2026-003', date: '2026-03-01', amount: '$1,500.00', status: 'Upcoming', service: 'Monthly Ads Management & Audit Retainer' }
      ];

      return res.status(200).json({
        success: true,
        client,
        reports: clientReports,
        invoices,
        assignedEngineer: {
          name: client?.assignedEngineer || 'Sakib (Super Admin)',
          role: 'Senior Tracking & Ads Architect',
          whatsapp: '+8801806301888',
          email: 'admin@optionsitld.com'
        }
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

