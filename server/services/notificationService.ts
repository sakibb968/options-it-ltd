import { db } from './dataStore';
import { logger } from '../utils/logger';
import { ENV } from '../config/env';

export interface NotificationPayload {
  type: 'lead' | 'audit' | 'client' | 'system';
  title: string;
  message: string;
  metadata?: Record<string, any>;
  recipientWhatsApp?: string;
  recipientEmail?: string;
}

export async function sendNotification(payload: NotificationPayload) {
  const notif = {
    _id: 'notif_' + Math.random().toString(36).substring(2, 9),
    type: payload.type,
    title: payload.title,
    message: payload.message,
    metadata: payload.metadata,
    read: false,
    createdAt: new Date().toISOString()
  };

  db.notifications.unshift(notif);
  logger.info(`Notification created: [${payload.type.toUpperCase()}] ${payload.title}`);

  // WhatsApp Alert Simulation & Webhook trigger
  const whatsappTarget = payload.recipientWhatsApp || ENV.ADMIN_WHATSAPP_NUMBER;
  logger.info(`WhatsApp Dispatch to ${whatsappTarget}: "${payload.title} - ${payload.message}"`);

  // Email Notification Log
  const emailTarget = payload.recipientEmail || ENV.ADMIN_NOTIFICATION_EMAIL;
  logger.info(`Email Dispatch to ${emailTarget}: Subject: "${payload.title}"`);

  return notif;
}
