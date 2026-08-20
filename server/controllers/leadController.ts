import { Request, Response } from 'express';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { ILead, LeadStatus } from '../models/types';
import { sendNotification } from '../services/notificationService';

export const leadController = {
  // Public submission from contact/lead form
  createLead: async (req: Request, res: Response) => {
    try {
      const { name, email, phone, companyName, websiteURL, serviceRequired, budget, message } = req.body;

      if (!name || !websiteURL) {
        return res.status(400).json({
          success: false,
          message: 'Name and Website URL are required.'
        });
      }

      const newLead: ILead = {
        _id: 'lead_' + Math.random().toString(36).substring(2, 9),
        name,
        email: email || 'not-provided@client.com',
        phone: phone || '',
        companyName: companyName || '',
        websiteURL,
        serviceRequired: serviceRequired || 'Server-Side Tracking & Meta CAPI',
        budget: budget || '$2,500 - $5,000 / month',
        message: message || '',
        status: 'New',
        notes: [
          {
            text: `Lead submitted via website. Budget: ${budget || '$2.5k-$5k'}.`,
            author: 'System',
            createdAt: new Date().toISOString()
          }
        ],
        assignedTo: 'Sakib Al-Hasan (Admin)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.leads.unshift(newLead);

      // Trigger multi-channel alert
      await sendNotification({
        type: 'lead',
        title: `🔥 New Lead: ${name} (${companyName || websiteURL})`,
        message: `Requested: ${serviceRequired || 'Tracking'}. Budget: ${budget}. Phone: ${phone}`,
        metadata: { leadId: newLead._id, website: websiteURL }
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your request has been received. Our tracking engineers will reach out within 2 hours.',
        lead: newLead
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get all leads (Admin/Editor) with search & status filter
  getAllLeads: async (req: AuthRequest, res: Response) => {
    try {
      const { status, search } = req.query;
      let leads = db.leads;

      if (status && typeof status === 'string') {
        leads = leads.filter(l => l.status.toLowerCase() === status.toLowerCase());
      }

      if (search && typeof search === 'string') {
        const query = search.toLowerCase();
        leads = leads.filter(l => 
          l.name.toLowerCase().includes(query) ||
          l.companyName.toLowerCase().includes(query) ||
          l.websiteURL.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query)
        );
      }

      return res.status(200).json({
        success: true,
        count: leads.length,
        leads
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get lead by ID
  getLeadById: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const lead = db.leads.find(l => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }
      return res.status(200).json({ success: true, lead });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Lead Status (New, Contacted, Qualified, Proposal Sent, Converted, Closed)
  updateStatus: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      const lead = db.leads.find(l => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      const prevStatus = lead.status;
      lead.status = status;
      lead.updatedAt = new Date().toISOString();
      lead.notes.push({
        text: `Status updated from '${prevStatus}' to '${status}'.`,
        author: req.user?.name || 'Admin',
        createdAt: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: `Lead status updated to ${status}.`,
        lead
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Add internal note to lead
  addNote: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { noteText } = req.body;

      if (!noteText) {
        return res.status(400).json({ success: false, message: 'Note text cannot be empty.' });
      }

      const lead = db.leads.find(l => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      const newNote = {
        text: noteText,
        author: req.user?.name || 'Admin',
        createdAt: new Date().toISOString()
      };

      lead.notes.push(newNote);
      lead.updatedAt = new Date().toISOString();

      return res.status(200).json({
        success: true,
        message: 'Internal note added to lead.',
        lead
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Assign lead to team member
  assignLead: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { assignedTo } = req.body;

      const lead = db.leads.find(l => l._id === id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      lead.assignedTo = assignedTo;
      lead.updatedAt = new Date().toISOString();
      lead.notes.push({
        text: `Assigned to ${assignedTo}`,
        author: req.user?.name || 'Admin',
        createdAt: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: `Lead assigned to ${assignedTo}`,
        lead
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete lead (Admin)
  deleteLead: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const idx = db.leads.findIndex(l => l._id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      const deleted = db.leads.splice(idx, 1);
      return res.status(200).json({
        success: true,
        message: 'Lead record deleted.',
        lead: deleted[0]
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
