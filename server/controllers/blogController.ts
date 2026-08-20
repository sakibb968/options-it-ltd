import { Request, Response } from 'express';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { IBlog } from '../models/types';

export const blogController = {
  // Get all published blogs (Public)
  getPublishedBlogs: async (req: Request, res: Response) => {
    try {
      const { category, tag } = req.query;
      let blogs = db.blogs.filter(b => b.status === 'published');

      if (category && typeof category === 'string') {
        blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }

      if (tag && typeof tag === 'string') {
        blogs = blogs.filter(b => b.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
      }

      return res.status(200).json({
        success: true,
        count: blogs.length,
        blogs
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get all blogs including drafts (Admin/Editor)
  getAllBlogs: async (req: AuthRequest, res: Response) => {
    try {
      return res.status(200).json({
        success: true,
        count: db.blogs.length,
        blogs: db.blogs
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get single blog post by slug
  getBlogBySlug: async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const blog = db.blogs.find(b => b.slug === slug || b._id === slug);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }
      return res.status(200).json({ success: true, blog });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create Blog Article (Admin/Editor)
  createBlog: async (req: AuthRequest, res: Response) => {
    try {
      const { title, slug, content, featuredImage, category, tags, seoTitle, seoDescription, status, readTime } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json({
          success: false,
          message: 'Title, content, and category are required.'
        });
      }

      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const newBlog: IBlog = {
        _id: 'blog_' + Math.random().toString(36).substring(2, 9),
        title,
        slug: generatedSlug,
        content,
        featuredImage: featuredImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        category,
        tags: Array.isArray(tags) ? tags : ['Tracking', 'Meta CAPI'],
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || content.substring(0, 150),
        author: req.user?.name || 'Options IT Editorial',
        readTime: readTime || '5 min read',
        status: status || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.blogs.push(newBlog);

      return res.status(201).json({
        success: true,
        message: 'Blog post published successfully.',
        blog: newBlog
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Blog Article (Admin/Editor)
  updateBlog: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const blog = db.blogs.find(b => b._id === id || b.slug === id);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }

      const { title, slug, content, featuredImage, category, tags, seoTitle, seoDescription, status, readTime } = req.body;

      if (title !== undefined) blog.title = title;
      if (slug !== undefined) blog.slug = slug;
      if (content !== undefined) blog.content = content;
      if (featuredImage !== undefined) blog.featuredImage = featuredImage;
      if (category !== undefined) blog.category = category;
      if (tags !== undefined) blog.tags = tags;
      if (seoTitle !== undefined) blog.seoTitle = seoTitle;
      if (seoDescription !== undefined) blog.seoDescription = seoDescription;
      if (status !== undefined) blog.status = status;
      if (readTime !== undefined) blog.readTime = readTime;
      blog.updatedAt = new Date().toISOString();

      return res.status(200).json({
        success: true,
        message: 'Blog article updated.',
        blog
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Blog Article (Admin)
  deleteBlog: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const idx = db.blogs.findIndex(b => b._id === id || b.slug === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }

      const deleted = db.blogs.splice(idx, 1);
      return res.status(200).json({
        success: true,
        message: 'Blog post deleted.',
        blog: deleted[0]
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
