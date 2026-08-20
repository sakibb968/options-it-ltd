import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { TestimonialModel } from '../models/mongooseSchemas';
import { ITestimonial } from '../models/types';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const testimonialController = {
  // Get all approved testimonials (Public)
  getApprovedTestimonials: async (req: Request, res: Response) => {
    try {
      if (isMongoActive()) {
        const testimonials = await TestimonialModel.find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: testimonials.length,
          testimonials
        });
      } else {
        const testimonials = db.testimonials.filter(t => t.status === 'approved');
        return res.status(200).json({
          success: true,
          count: testimonials.length,
          testimonials
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get all testimonials including pending/rejected (Admin)
  getAllTestimonials: async (req: AuthRequest, res: Response) => {
    try {
      if (isMongoActive()) {
        const testimonials = await TestimonialModel.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: testimonials.length,
          testimonials
        });
      } else {
        return res.status(200).json({
          success: true,
          count: db.testimonials.length,
          testimonials: db.testimonials
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create Testimonial (Admin or Public Review submission)
  createTestimonial: async (req: Request, res: Response) => {
    try {
      const { clientName, company, role, photo, review, rating, platform, status } = req.body;

      if (!clientName || !company || !review) {
        return res.status(400).json({
          success: false,
          message: 'Client name, company, and review text are required.'
        });
      }

      if (isMongoActive()) {
        const created = await TestimonialModel.create({
          clientName,
          company,
          role: role || 'Founder',
          photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          review,
          rating: rating ? Number(rating) : 5,
          platform: platform || 'Shopify Plus',
          status: status || 'approved'
        });

        return res.status(201).json({
          success: true,
          message: 'Testimonial added to MongoDB.',
          testimonial: created
        });
      } else {
        const newTestimonial: ITestimonial = {
          _id: 'test_' + Math.random().toString(36).substring(2, 9),
          clientName,
          company,
          role: role || 'Founder',
          photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          review,
          rating: rating ? Number(rating) : 5,
          platform: platform || 'Shopify Plus',
          status: status || 'approved',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.testimonials.push(newTestimonial);

        return res.status(201).json({
          success: true,
          message: 'Testimonial added successfully.',
          testimonial: newTestimonial
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Testimonial / Approval Status (Admin)
  updateTestimonial: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { clientName, company, role, photo, review, rating, platform, status } = req.body;

      if (isMongoActive()) {
        const testimonial = await TestimonialModel.findById(id);
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found in MongoDB.' });
        }

        if (clientName !== undefined) testimonial.clientName = clientName;
        if (company !== undefined) testimonial.company = company;
        if (role !== undefined) testimonial.role = role;
        if (photo !== undefined) testimonial.photo = photo;
        if (review !== undefined) testimonial.review = review;
        if (rating !== undefined) testimonial.rating = Number(rating);
        if (platform !== undefined) testimonial.platform = platform;
        if (status !== undefined) testimonial.status = status;

        await testimonial.save();

        return res.status(200).json({
          success: true,
          message: 'Testimonial updated in MongoDB.',
          testimonial
        });
      } else {
        const testimonial = db.testimonials.find(t => t._id === id);
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        if (clientName !== undefined) testimonial.clientName = clientName;
        if (company !== undefined) testimonial.company = company;
        if (role !== undefined) testimonial.role = role;
        if (photo !== undefined) testimonial.photo = photo;
        if (review !== undefined) testimonial.review = review;
        if (rating !== undefined) testimonial.rating = Number(rating);
        if (platform !== undefined) testimonial.platform = platform;
        if (status !== undefined) testimonial.status = status;
        testimonial.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Testimonial updated.',
          testimonial
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Testimonial (Admin)
  deleteTestimonial: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const deleted = await TestimonialModel.findByIdAndDelete(id).lean();
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }
        return res.status(200).json({
          success: true,
          message: 'Testimonial removed from MongoDB.',
          testimonial: deleted
        });
      } else {
        const idx = db.testimonials.findIndex(t => t._id === id);
        if (idx === -1) {
          return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        const deleted = db.testimonials.splice(idx, 1);
        return res.status(200).json({
          success: true,
          message: 'Testimonial removed.',
          testimonial: deleted[0]
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

