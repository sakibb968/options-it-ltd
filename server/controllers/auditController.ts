import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { AuditRequestModel } from '../models/mongooseSchemas';
import { IAuditRequest } from '../models/types';
import { sendNotification } from '../services/notificationService';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const auditController = {
  // Public submission of Free Audit request
  submitAudit: async (req: Request, res: Response) => {
    try {
      const { name, businessName, website, email, phone, trackingProblem, adPlatform } = req.body;

      if (!name || !website || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Name, website URL, and WhatsApp/Phone number are required.'
        });
      }

      let createdAudit: any = null;

      if (isMongoActive()) {
        createdAudit = await AuditRequestModel.create({
          name,
          businessName: businessName || name + ' Store',
          website,
          email: email || 'audit-client@domain.com',
          phone,
          trackingProblem: trackingProblem || 'Safari/iOS signal loss & ROAS drop',
          adPlatform: adPlatform || 'Meta Ads + Google Ads',
          status: 'pending',
          technicalNotes: ''
        });
      } else {
        const newAudit: IAuditRequest = {
          _id: 'audit_' + Math.random().toString(36).substring(2, 9),
          name,
          businessName: businessName || name + ' Store',
          website,
          email: email || 'audit-client@domain.com',
          phone,
          trackingProblem: trackingProblem || 'Safari/iOS signal loss & ROAS drop',
          adPlatform: adPlatform || 'Meta Ads + Google Ads',
          status: 'pending',
          technicalNotes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.auditRequests.unshift(newAudit);
        createdAudit = newAudit;
      }

      const auditId = createdAudit._id ? createdAudit._id.toString() : createdAudit.id;

      // Trigger multi-channel alert
      await sendNotification({
        type: 'audit',
        title: `🎯 Audit Request: ${name} (${website})`,
        message: `Issue: ${trackingProblem}. Platform: ${adPlatform}. Phone: ${phone}`,
        metadata: { auditId, website }
      });

      return res.status(201).json({
        success: true,
        message: 'Your free store audit request has been registered. Our tracking team will deliver a 5-minute video diagnostic within 24 hours.',
        audit: createdAudit
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get all audit requests (Admin/Editor)
  getAllAudits: async (req: AuthRequest, res: Response) => {
    try {
      const { status } = req.query;

      if (isMongoActive()) {
        const query: any = {};
        if (status && typeof status === 'string') {
          query.status = status;
        }

        const audits = await AuditRequestModel.find(query).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: audits.length,
          audits
        });
      } else {
        let audits = db.auditRequests;

        if (status && typeof status === 'string') {
          audits = audits.filter(a => a.status.toLowerCase() === status.toLowerCase());
        }

        return res.status(200).json({
          success: true,
          count: audits.length,
          audits
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update audit status and technical notes (Admin)
  updateAudit: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status, technicalNotes } = req.body;

      if (isMongoActive()) {
        const audit = await AuditRequestModel.findById(id);
        if (!audit) {
          return res.status(404).json({ success: false, message: 'Audit request not found in MongoDB.' });
        }

        if (status !== undefined) audit.status = status;
        if (technicalNotes !== undefined) audit.technicalNotes = technicalNotes;
        await audit.save();

        return res.status(200).json({
          success: true,
          message: 'Audit review updated in MongoDB.',
          audit
        });
      } else {
        const audit = db.auditRequests.find(a => a._id === id);
        if (!audit) {
          return res.status(404).json({ success: false, message: 'Audit request not found.' });
        }

        if (status !== undefined) audit.status = status;
        if (technicalNotes !== undefined) audit.technicalNotes = technicalNotes;
        audit.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Audit review updated.',
          audit
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Audit (Admin)
  deleteAudit: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const deleted = await AuditRequestModel.findByIdAndDelete(id).lean();
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Audit not found.' });
        }
        return res.status(200).json({
          success: true,
          message: 'Audit record deleted from MongoDB.',
          audit: deleted
        });
      } else {
        const idx = db.auditRequests.findIndex(a => a._id === id);
        if (idx === -1) {
          return res.status(404).json({ success: false, message: 'Audit not found.' });
        }

        const deleted = db.auditRequests.splice(idx, 1);
        return res.status(200).json({
          success: true,
          message: 'Audit record deleted.',
          audit: deleted[0]
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

