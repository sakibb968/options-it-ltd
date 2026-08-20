import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { ProjectModel } from '../models/mongooseSchemas';
import { IProject } from '../models/types';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const projectController = {
  // Get all projects / case studies (Public)
  getAllProjects: async (req: Request, res: Response) => {
    try {
      if (isMongoActive()) {
        const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: projects.length,
          projects
        });
      } else {
        return res.status(200).json({
          success: true,
          count: db.projects.length,
          projects: db.projects
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get project by slug
  getProjectBySlug: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      if (isMongoActive()) {
        const project = await ProjectModel.findOne({
          $or: [{ slug }, { _id: mongoose.isValidObjectId(slug) ? slug : null }]
        }).lean();

        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }
        return res.status(200).json({ success: true, project });
      } else {
        const project = db.projects.find(p => p.slug === slug || p._id === slug);
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }
        return res.status(200).json({ success: true, project });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create Project / Case Study (Admin/Editor)
  createProject: async (req: AuthRequest, res: Response) => {
    try {
      const { clientName, projectTitle, slug, problem, solution, servicesUsed, results, beforeAfterData, images, testimonial, status } = req.body;

      if (!clientName || !projectTitle || !problem || !solution) {
        return res.status(400).json({
          success: false,
          message: 'Client name, project title, problem, and solution are required.'
        });
      }

      const generatedSlug = slug || projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (isMongoActive()) {
        const created = await ProjectModel.create({
          clientName,
          projectTitle,
          slug: generatedSlug,
          problem,
          solution,
          servicesUsed: Array.isArray(servicesUsed) ? servicesUsed : ['Server-Side Tracking'],
          results: results || 'Significant ROAS lift and verified Event Match Quality.',
          beforeAfterData: beforeAfterData || {
            beforeMetric: '2.1x ROAS',
            afterMetric: '3.9x ROAS',
            roasUplift: '+85%',
            emqScore: '9.6 / 10'
          },
          images: Array.isArray(images) ? images : [],
          testimonial,
          status: status || 'published'
        });

        return res.status(201).json({
          success: true,
          message: 'Case study project created in MongoDB.',
          project: created
        });
      } else {
        const newProject: IProject = {
          _id: 'proj_' + Math.random().toString(36).substring(2, 9),
          clientName,
          projectTitle,
          slug: generatedSlug,
          problem,
          solution,
          servicesUsed: Array.isArray(servicesUsed) ? servicesUsed : ['Server-Side Tracking'],
          results: results || 'Significant ROAS lift and verified Event Match Quality.',
          beforeAfterData: beforeAfterData || {
            beforeMetric: '2.1x ROAS',
            afterMetric: '3.9x ROAS',
            roasUplift: '+85%',
            emqScore: '9.6 / 10'
          },
          images: Array.isArray(images) ? images : [],
          testimonial,
          status: status || 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.projects.push(newProject);

        return res.status(201).json({
          success: true,
          message: 'Case study project created successfully.',
          project: newProject
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Project (Admin/Editor)
  updateProject: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { clientName, projectTitle, slug, problem, solution, servicesUsed, results, beforeAfterData, images, testimonial, status } = req.body;

      if (isMongoActive()) {
        const project = await ProjectModel.findOne({
          $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }]
        });

        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        if (clientName !== undefined) project.clientName = clientName;
        if (projectTitle !== undefined) project.projectTitle = projectTitle;
        if (slug !== undefined) project.slug = slug;
        if (problem !== undefined) project.problem = problem;
        if (solution !== undefined) project.solution = solution;
        if (servicesUsed !== undefined) project.servicesUsed = servicesUsed;
        if (results !== undefined) project.results = results;
        if (beforeAfterData !== undefined) project.beforeAfterData = beforeAfterData;
        if (images !== undefined) project.images = images;
        if (testimonial !== undefined) project.testimonial = testimonial;
        if (status !== undefined) project.status = status;

        await project.save();

        return res.status(200).json({
          success: true,
          message: 'Case study project updated in MongoDB.',
          project
        });
      } else {
        const project = db.projects.find(p => p._id === id || p.slug === id);
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        if (clientName !== undefined) project.clientName = clientName;
        if (projectTitle !== undefined) project.projectTitle = projectTitle;
        if (slug !== undefined) project.slug = slug;
        if (problem !== undefined) project.problem = problem;
        if (solution !== undefined) project.solution = solution;
        if (servicesUsed !== undefined) project.servicesUsed = servicesUsed;
        if (results !== undefined) project.results = results;
        if (beforeAfterData !== undefined) project.beforeAfterData = beforeAfterData;
        if (images !== undefined) project.images = images;
        if (testimonial !== undefined) project.testimonial = testimonial;
        if (status !== undefined) project.status = status;
        project.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Case study project updated.',
          project
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Project (Admin)
  deleteProject: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (isMongoActive()) {
        const deleted = await ProjectModel.findOneAndDelete({
          $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }]
        }).lean();

        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Case study deleted from MongoDB.',
          project: deleted
        });
      } else {
        const idx = db.projects.findIndex(p => p._id === id || p.slug === id);
        if (idx === -1) {
          return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        const deleted = db.projects.splice(idx, 1);
        return res.status(200).json({
          success: true,
          message: 'Case study deleted.',
          project: deleted[0]
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

