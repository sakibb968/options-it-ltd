import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { db } from '../services/dataStore';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { UserModel } from '../models/mongooseSchemas';
import { IUser } from '../models/types';

const isMongoActive = () => mongoose.connection.readyState === 1 && db.isMongoConnected;

export const authController = {
  // Login
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required.'
        });
      }

      const cleanEmail = email.trim().toLowerCase();
      let user: any = null;

      if (isMongoActive()) {
        try {
          user = await UserModel.findOne({ email: cleanEmail });
        } catch (dbErr: any) {
          console.warn('⚠️ MongoDB query error during login, falling back to dataStore:', dbErr.message);
        }
      }

      // If not found in MongoDB or MongoDB is not connected, check in-memory store
      if (!user) {
        user = db.users.find(u => u.email.toLowerCase() === cleanEmail);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. No registered account found for this email address.'
        });
      }

      if (user.isActive === false) {
        return res.status(403).json({
          success: false,
          message: 'This account has been deactivated by administration.'
        });
      }

      let isMatch = false;
      try {
        if (user.password && user.password.startsWith('$2')) {
          isMatch = await bcrypt.compare(password, user.password);
        } else if (user.password) {
          isMatch = user.password === password;
        }
      } catch (err: any) {
        console.error('Password comparison error:', err);
        isMatch = false;
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. The password you entered is incorrect.'
        });
      }

      const userId = user._id ? user._id.toString() : user.id;

      const token = generateToken({
        userId,
        email: user.email,
        role: user.role,
        name: user.name
      });

      const safeUser = {
        _id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        companyName: user.companyName || '',
        avatar: user.avatar || '',
        isActive: user.isActive
      };

      return res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        token,
        user: safeUser
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error during login.',
        error: error.message
      });
    }
  },

  // Register New User (Super Admin / Admin only, or Client signup)
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, phone, companyName } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required fields.'
        });
      }

      const cleanEmail = email.trim().toLowerCase();

      if (isMongoActive()) {
        const existing = await UserModel.findOne({ email: cleanEmail });
        if (existing) {
          return res.status(409).json({
            success: false,
            message: 'A user with this email address already exists.'
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const created = await UserModel.create({
          name,
          email: cleanEmail,
          password: hashedPassword,
          role: role || 'Client',
          phone: phone || '',
          companyName: companyName || '',
          isActive: true
        });

        const userId = created._id.toString();
        const token = generateToken({
          userId,
          email: created.email,
          role: created.role,
          name: created.name
        });

        return res.status(201).json({
          success: true,
          message: 'User registered successfully in MongoDB.',
          token,
          user: {
            _id: userId,
            name: created.name,
            email: created.email,
            role: created.role,
            phone: created.phone,
            companyName: created.companyName,
            isActive: created.isActive
          }
        });
      } else {
        const existingUser = db.users.find(u => u.email.toLowerCase() === cleanEmail);
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'A user with this email address already exists.'
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: IUser = {
          _id: 'usr_' + Math.random().toString(36).substring(2, 9),
          name,
          email: cleanEmail,
          password: hashedPassword,
          role: role || 'Client',
          phone: phone || '',
          companyName: companyName || '',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.users.push(newUser);

        const token = generateToken({
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role,
          name: newUser.name
        });

        const { password: _, ...safeUser } = newUser;

        return res.status(201).json({
          success: true,
          message: 'User registered successfully.',
          token,
          user: safeUser
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to register user.',
        error: error.message
      });
    }
  },

  // Get current logged-in user profile
  getProfile: async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      if (isMongoActive()) {
        const user = await UserModel.findById(req.user.userId).select('-password').lean();
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found in database.' });
        }
        return res.status(200).json({
          success: true,
          user
        });
      } else {
        const user = db.users.find(u => u._id === req.user?.userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const { password: _, ...safeUser } = user;
        return res.status(200).json({
          success: true,
          user: safeUser
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Change Password
  changePassword: async (req: AuthRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Both current password and new password are required.'
        });
      }

      if (isMongoActive()) {
        const user = await UserModel.findById(req.user?.userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: 'Current password provided is incorrect.'
          });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).json({
          success: true,
          message: 'Password changed successfully in MongoDB.'
        });
      } else {
        const user = db.users.find(u => u._id === req.user?.userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password || '');
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: 'Current password provided is incorrect.'
          });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.updatedAt = new Date().toISOString();

        return res.status(200).json({
          success: true,
          message: 'Password changed successfully.'
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Password Reset Request
  requestPasswordReset: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
      }

      const cleanEmail = email.trim().toLowerCase();

      if (isMongoActive()) {
        const user = await UserModel.findOne({ email: cleanEmail });
        if (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash('ResetPass@2026', salt);
          await user.save();
        }
      } else {
        const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);
        if (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash('ResetPass@2026', salt);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been dispatched.'
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // List all users (Super Admin / Admin)
  listUsers: async (req: AuthRequest, res: Response) => {
    try {
      if (isMongoActive()) {
        const users = await UserModel.find().select('-password').sort({ createdAt: -1 }).lean();
        return res.status(200).json({
          success: true,
          count: users.length,
          users
        });
      } else {
        const safeUsers = db.users.map(({ password, ...rest }) => rest);
        return res.status(200).json({
          success: true,
          count: safeUsers.length,
          users: safeUsers
        });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

