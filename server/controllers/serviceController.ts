import { Request, Response } from 'express';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { IService } from '../models/types';

export const serviceController = {
  // Get all services (Public)
  getAllServices: async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      let services = db.services;
      if (status) {
        services = services.filter(s => s.status === status);
      }
      return res.status(200).json({
        success: true,
        count: services.length,
        services
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get service by slug or ID
  getServiceBySlug: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const service = db.services.find(s => s.slug === slug || s._id === slug);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }
      return res.status(200).json({
        success: true,
        service
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create new service (Admin/Editor)
  createService: async (req: AuthRequest, res: Response) => {
    try {
      const { serviceName, slug, shortDescription, fullDescription, icon, bannerImage, features, pricingStartingAt, status } = req.body;

      if (!serviceName || !shortDescription) {
        return res.status(400).json({
          success: false,
          message: 'Service name and short description are required.'
        });
      }

      const generatedSlug = slug || serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const newService: IService = {
        _id: 'srv_' + Math.random().toString(36).substring(2, 9),
        serviceName,
        slug: generatedSlug,
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        icon: icon || 'Activity',
        bannerImage: bannerImage || '',
        features: Array.isArray(features) ? features : [],
        pricingStartingAt: pricingStartingAt ? Number(pricingStartingAt) : 399,
        status: status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.services.push(newService);

      return res.status(201).json({
        success: true,
        message: 'Service created successfully.',
        service: newService
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update service (Admin/Editor)
  updateService: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const service = db.services.find(s => s._id === id || s.slug === id);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }

      const { serviceName, slug, shortDescription, fullDescription, icon, bannerImage, features, pricingStartingAt, status } = req.body;

      if (serviceName !== undefined) service.serviceName = serviceName;
      if (slug !== undefined) service.slug = slug;
      if (shortDescription !== undefined) service.shortDescription = shortDescription;
      if (fullDescription !== undefined) service.fullDescription = fullDescription;
      if (icon !== undefined) service.icon = icon;
      if (bannerImage !== undefined) service.bannerImage = bannerImage;
      if (features !== undefined) service.features = features;
      if (pricingStartingAt !== undefined) service.pricingStartingAt = Number(pricingStartingAt);
      if (status !== undefined) service.status = status;
      service.updatedAt = new Date().toISOString();

      return res.status(200).json({
        success: true,
        message: 'Service updated successfully.',
        service
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete service (Admin only)
  deleteService: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const index = db.services.findIndex(s => s._id === id || s.slug === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Service not found.' });
      }

      const deleted = db.services.splice(index, 1);

      return res.status(200).json({
        success: true,
        message: 'Service deleted successfully.',
        service: deleted[0]
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
