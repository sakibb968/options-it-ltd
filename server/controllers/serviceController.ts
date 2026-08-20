import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { ServiceModel } from '../models/mongooseSchemas';
import { IService } from '../models/types';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const serviceController = {
  // Get all services (Public)
  getAllServices: async (req: Request, res: Response) => {
    try {
      const { status } = req.query;

      if (isMongoActive()) {
        const query: any = {};
        if (status) query.status = status;
        const services = await ServiceModel.find(query).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: services.length,
          services
        });
      } else {
        let services = db.services;
        if (status) {
          services = services.filter(s => s.status === status);
        }
        return res.status(200).json({
          success: true,
          count: services.length,
          services
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get service by slug or ID
  getServiceBySlug: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      if (isMongoActive()) {
        const isObjectId = mongoose.Types.ObjectId.isValid(slug);
        const query = isObjectId ? { $or: [{ _id: slug }, { slug }] } : { slug };
        const service = await ServiceModel.findOne(query).lean();
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found in MongoDB.' });
        }
        return res.status(200).json({ success: true, service });
      } else {
        const service = db.services.find(s => s.slug === slug || s._id === slug);
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found.' });
        }
        return res.status(200).json({
          success: true,
          service
        });
      }
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

      if (isMongoActive()) {
        const created = await ServiceModel.create({
          serviceName,
          slug: generatedSlug,
          shortDescription,
          fullDescription: fullDescription || shortDescription,
          icon: icon || 'Activity',
          bannerImage: bannerImage || '',
          features: Array.isArray(features) ? features : [],
          pricingStartingAt: pricingStartingAt ? Number(pricingStartingAt) : 399,
          status: status || 'active'
        });

        return res.status(201).json({
          success: true,
          message: 'Service created successfully in MongoDB.',
          service: created
        });
      } else {
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
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update service (Admin/Editor)
  updateService: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { serviceName, slug, shortDescription, fullDescription, icon, bannerImage, features, pricingStartingAt, status } = req.body;

      if (isMongoActive()) {
        const isObjectId = mongoose.Types.ObjectId.isValid(id);
        const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

        const updateData: any = {};
        if (serviceName !== undefined) updateData.serviceName = serviceName;
        if (slug !== undefined) updateData.slug = slug;
        if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
        if (fullDescription !== undefined) updateData.fullDescription = fullDescription;
        if (icon !== undefined) updateData.icon = icon;
        if (bannerImage !== undefined) updateData.bannerImage = bannerImage;
        if (features !== undefined) updateData.features = features;
        if (pricingStartingAt !== undefined) updateData.pricingStartingAt = Number(pricingStartingAt);
        if (status !== undefined) updateData.status = status;

        const updated = await ServiceModel.findOneAndUpdate(query, updateData, { new: true });
        if (!updated) {
          return res.status(404).json({ success: false, message: 'Service not found in MongoDB.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Service updated successfully in MongoDB.',
          service: updated
        });
      } else {
        const service = db.services.find(s => s._id === id || s.slug === id);
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found.' });
        }

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
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete service (Admin only)
  deleteService: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const isObjectId = mongoose.Types.ObjectId.isValid(id);
        const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

        const deleted = await ServiceModel.findOneAndDelete(query).lean();
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Service not found.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Service deleted successfully from MongoDB.',
          service: deleted
        });
      } else {
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
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

