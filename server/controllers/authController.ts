import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../services/dataStore';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { IUser } from '../models/types';

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

      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. No account found with this email.'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'This account has been deactivated by administration.'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password || '');
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Incorrect password.'
        });
      }

      const token = generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      });

      const { password: _, ...safeUser } = user;

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

      const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
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
        email: email.toLowerCase(),
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

      const user = db.users.find(u => u._id === req.user?.userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const { password: _, ...safeUser } = user;
      return res.status(200).json({
        success: true,
        user: safeUser
      });
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

      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        // Return success even if not found to prevent user enumeration
        return res.status(200).json({
          success: true,
          message: 'If the email exists, a password reset link has been dispatched.'
        });
      }

      // Generate temporary reset token or reset to default demo
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash('ResetPass@2026', salt);

      return res.status(200).json({
        success: true,
        message: 'Password reset link sent. (Demo: Temporary password set to ResetPass@2026)'
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // List all users (Super Admin / Admin)
  listUsers: async (req: AuthRequest, res: Response) => {
    try {
      const safeUsers = db.users.map(({ password, ...rest }) => rest);
      return res.status(200).json({
        success: true,
        count: safeUsers.length,
        users: safeUsers
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
