import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { ReportModel, ClientModel } from '../models/mongooseSchemas';
import { IReport } from '../models/types';
import { sendNotification } from '../services/notificationService';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const reportController = {
  // Get all reports (Admin / Editor)
  getAllReports: async (req: AuthRequest, res: Response) => {
    try {
      const { clientId, reportType } = req.query;

      if (isMongoActive()) {
        const query: any = {};
        if (clientId && typeof clientId === 'string') {
          query.clientId = clientId;
        }
        if (reportType && typeof reportType === 'string') {
          query.reportType = reportType;
        }

        const reports = await ReportModel.find(query).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: reports.length,
          reports
        });
      } else {
        let reports = db.reports;

        if (clientId && typeof clientId === 'string') {
          reports = reports.filter(r => r.clientId === clientId);
        }

        if (reportType && typeof reportType === 'string') {
          reports = reports.filter(r => r.reportType.toLowerCase() === reportType.toLowerCase());
        }

        return res.status(200).json({
          success: true,
          count: reports.length,
          reports
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get Reports for specific Client (Client Portal / Admin)
  getClientReports: async (req: AuthRequest, res: Response) => {
    try {
      const { clientId } = req.params;

      if (isMongoActive()) {
        const reports = await ReportModel.find({ clientId }).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: reports.length,
          reports
        });
      } else {
        const reports = db.reports.filter(r => r.clientId === clientId);
        return res.status(200).json({
          success: true,
          count: reports.length,
          reports
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Upload & create new Report (Admin/Editor)
  createReport: async (req: AuthRequest, res: Response) => {
    try {
      const { clientId, clientName, reportTitle, reportType, reportDate, fileUrl, fileSize, summary, metrics } = req.body;

      if (!clientId || !reportTitle || !reportType) {
        return res.status(400).json({
          success: false,
          message: 'Client ID, report title, and report type are required.'
        });
      }

      if (isMongoActive()) {
        let resolvedClientName = clientName;
        if (!resolvedClientName) {
          const client = await ClientModel.findById(clientId).lean();
          resolvedClientName = (client as any)?.companyName || 'Client Store';
        }

        const created = await ReportModel.create({
          clientId,
          clientName: resolvedClientName,
          reportTitle,
          reportType,
          reportDate: reportDate || new Date().toISOString().split('T')[0],
          fileUrl: fileUrl || '/uploads/reports/sample_performance_audit.pdf',
          fileSize: fileSize || '2.8 MB',
          summary: summary || 'Monthly Performance & Attribution Audit',
          metrics: metrics || { spend: 10000, roas: 3.5, conversions: 500, emqScore: 9.2 }
        });

        await sendNotification({
          type: 'client',
          title: `New Report Published: ${reportTitle}`,
          message: `Your ${reportType} report for ${created.clientName} is now ready to download in your Client Portal.`,
          metadata: { reportId: created._id.toString(), clientId }
        });

        return res.status(201).json({
          success: true,
          message: 'Report uploaded and published to MongoDB.',
          report: created
        });
      } else {
        const client = db.clients.find(c => c._id === clientId);

        const newReport: IReport = {
          _id: 'rep_' + Math.random().toString(36).substring(2, 9),
          clientId,
          clientName: clientName || client?.companyName || 'Client Store',
          reportTitle,
          reportType,
          reportDate: reportDate || new Date().toISOString().split('T')[0],
          fileUrl: fileUrl || '/uploads/reports/sample_performance_audit.pdf',
          fileSize: fileSize || '2.8 MB',
          summary: summary || 'Monthly Performance & Attribution Audit',
          metrics: metrics || { spend: 10000, roas: 3.5, conversions: 500, emqScore: 9.2 },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.reports.unshift(newReport);

        // Notify client
        await sendNotification({
          type: 'client',
          title: `New Report Published: ${reportTitle}`,
          message: `Your ${reportType} report for ${newReport.clientName} is now ready to download in your Client Portal.`,
          metadata: { reportId: newReport._id, clientId }
        });

        return res.status(201).json({
          success: true,
          message: 'Report uploaded and published to client portal.',
          report: newReport
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Report (Admin)
  deleteReport: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const deleted = await ReportModel.findByIdAndDelete(id).lean();
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Report not found.' });
        }
        return res.status(200).json({
          success: true,
          message: 'Report deleted from MongoDB.',
          report: deleted
        });
      } else {
        const idx = db.reports.findIndex(r => r._id === id);
        if (idx === -1) {
          return res.status(404).json({ success: false, message: 'Report not found.' });
        }

        const deleted = db.reports.splice(idx, 1);
        return res.status(200).json({
          success: true,
          message: 'Report deleted.',
          report: deleted[0]
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

