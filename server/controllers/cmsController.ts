import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { AuthRequest } from '../middleware/auth';
import { CMSContentModel } from '../models/mongooseSchemas';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const cmsController = {
  // Get all CMS website content (Public)
  getContent: async (req: Request, res: Response) => {
    try {
      if (isMongoActive()) {
        let content = await CMSContentModel.findOne().lean();
        if (!content) {
          content = await CMSContentModel.create(db.webContent);
        }
        return res.status(200).json({
          success: true,
          content
        });
      } else {
        return res.status(200).json({
          success: true,
          content: db.webContent
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update homepage CMS content (Admin/Editor)
  updateHomepage: async (req: AuthRequest, res: Response) => {
    try {
      const { heroTitle, heroSubtitle, ctaPrimaryText, ctaSecondaryText, bannerImage, statistics, trustBadges } = req.body;

      if (isMongoActive()) {
        let content = await CMSContentModel.findOne();
        if (!content) {
          content = new CMSContentModel(db.webContent);
        }

        if (heroTitle !== undefined) content.homepage.heroTitle = heroTitle;
        if (heroSubtitle !== undefined) content.homepage.heroSubtitle = heroSubtitle;
        if (ctaPrimaryText !== undefined) content.homepage.ctaPrimaryText = ctaPrimaryText;
        if (ctaSecondaryText !== undefined) content.homepage.ctaSecondaryText = ctaSecondaryText;
        if (bannerImage !== undefined) content.homepage.bannerImage = bannerImage;
        if (statistics !== undefined) content.homepage.statistics = statistics;
        if (trustBadges !== undefined) content.homepage.trustBadges = trustBadges;

        await content.save();

        return res.status(200).json({
          success: true,
          message: 'Homepage CMS content updated in MongoDB.',
          homepage: content.homepage
        });
      } else {
        if (!db.webContent) {
          return res.status(404).json({ success: false, message: 'Web content not initialized' });
        }

        if (heroTitle !== undefined) db.webContent.homepage.heroTitle = heroTitle;
        if (heroSubtitle !== undefined) db.webContent.homepage.heroSubtitle = heroSubtitle;
        if (ctaPrimaryText !== undefined) db.webContent.homepage.ctaPrimaryText = ctaPrimaryText;
        if (ctaSecondaryText !== undefined) db.webContent.homepage.ctaSecondaryText = ctaSecondaryText;
        if (bannerImage !== undefined) db.webContent.homepage.bannerImage = bannerImage;
        if (statistics !== undefined) db.webContent.homepage.statistics = statistics;
        if (trustBadges !== undefined) db.webContent.homepage.trustBadges = trustBadges;

        db.webContent.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Homepage CMS content updated successfully.',
          homepage: db.webContent.homepage
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update about page CMS content (Admin/Editor)
  updateAboutPage: async (req: AuthRequest, res: Response) => {
    try {
      const { companyDescription, mission, vision, coreValues } = req.body;

      if (isMongoActive()) {
        let content = await CMSContentModel.findOne();
        if (!content) {
          content = new CMSContentModel(db.webContent);
        }

        if (companyDescription !== undefined) content.aboutPage.companyDescription = companyDescription;
        if (mission !== undefined) content.aboutPage.mission = mission;
        if (vision !== undefined) content.aboutPage.vision = vision;
        if (coreValues !== undefined) content.aboutPage.coreValues = coreValues;

        await content.save();

        return res.status(200).json({
          success: true,
          message: 'About page CMS content updated in MongoDB.',
          aboutPage: content.aboutPage
        });
      } else {
        if (!db.webContent) {
          return res.status(404).json({ success: false, message: 'Web content not initialized' });
        }

        if (companyDescription !== undefined) db.webContent.aboutPage.companyDescription = companyDescription;
        if (mission !== undefined) db.webContent.aboutPage.mission = mission;
        if (vision !== undefined) db.webContent.aboutPage.vision = vision;
        if (coreValues !== undefined) db.webContent.aboutPage.coreValues = coreValues;

        db.webContent.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'About page CMS content updated successfully.',
          aboutPage: db.webContent.aboutPage
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update contact info (Admin/Editor)
  updateContactInfo: async (req: AuthRequest, res: Response) => {
    try {
      const { whatsapp, email, domain, address, supportHours } = req.body;

      if (isMongoActive()) {
        let content = await CMSContentModel.findOne();
        if (!content) {
          content = new CMSContentModel(db.webContent);
        }

        if (whatsapp !== undefined) content.contactInfo.whatsapp = whatsapp;
        if (email !== undefined) content.contactInfo.email = email;
        if (domain !== undefined) content.contactInfo.domain = domain;
        if (address !== undefined) content.contactInfo.address = address;
        if (supportHours !== undefined) content.contactInfo.supportHours = supportHours;

        await content.save();

        return res.status(200).json({
          success: true,
          message: 'Contact details updated in MongoDB.',
          contactInfo: content.contactInfo
        });
      } else {
        if (!db.webContent) {
          return res.status(404).json({ success: false, message: 'Web content not initialized' });
        }

        if (whatsapp !== undefined) db.webContent.contactInfo.whatsapp = whatsapp;
        if (email !== undefined) db.webContent.contactInfo.email = email;
        if (domain !== undefined) db.webContent.contactInfo.domain = domain;
        if (address !== undefined) db.webContent.contactInfo.address = address;
        if (supportHours !== undefined) db.webContent.contactInfo.supportHours = supportHours;

        db.webContent.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Contact details updated successfully.',
          contactInfo: db.webContent.contactInfo
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

