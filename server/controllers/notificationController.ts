import { Request, Response } from 'express';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { sendNotification } from '../services/notificationService';

export const notificationController = {
  // Get all notifications
  getAllNotifications: async (req: AuthRequest, res: Response) => {
    try {
      return res.status(200).json({
        success: true,
        count: db.notifications.length,
        unreadCount: db.notifications.filter(n => !n.read).length,
        notifications: db.notifications
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Mark notification as read
  markAsRead: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const notif = db.notifications.find(n => n._id === id);
      if (!notif) {
        return res.status(404).json({ success: false, message: 'Notification not found.' });
      }

      notif.read = true;

      return res.status(200).json({
        success: true,
        notification: notif
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (req: AuthRequest, res: Response) => {
    try {
      db.notifications.forEach(n => { n.read = true; });
      return res.status(200).json({
        success: true,
        message: 'All notifications marked as read.'
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Send Manual Notification (WhatsApp / Email alert test)
  sendCustomNotification: async (req: AuthRequest, res: Response) => {
    try {
      const { type, title, message, recipientWhatsApp, recipientEmail } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          success: false,
          message: 'Title and message are required.'
        });
      }

      const notif = await sendNotification({
        type: type || 'system',
        title,
        message,
        recipientWhatsApp,
        recipientEmail
      });

      return res.status(201).json({
        success: true,
        message: 'Notification dispatched via System, Email & WhatsApp channels.',
        notification: notif
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
