import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { UserRole } from '../models/types';
import { db } from '../services/dataStore';
import { UserModel } from '../models/mongooseSchemas';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function normalizeRole(role: string): string {
  const r = (role || '').toLowerCase().replace(/[\s_-]+/g, '');
  if (r === 'superadmin') return 'Super Admin';
  if (r === 'admin') return 'Admin';
  if (r === 'editor') return 'Editor';
  if (r === 'client') return 'Client';
  return role;
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Missing or malformed Bearer token.'
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Invalid, expired, or revoked token. Please log in again.'
      });
    }

    // Verify user is still active in database
    if (mongoose.connection.readyState === 1 && db.isMongoConnected) {
      const user = await UserModel.findById(payload.userId).lean();
      if (!user || (user as any).isActive === false) {
        return res.status(403).json({
          success: false,
          message: 'User account has been deactivated or not found.'
        });
      }
    } else {
      const user = db.users.find(u => u._id === payload.userId);
      if (user && !user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'User account has been deactivated.'
        });
      }
    }

    req.user = payload;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
      error: error.message
    });
  }
}

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. User context missing.'
      });
    }

    const userRoleNorm = normalizeRole(req.user.role);
    const normalizedAllowed = allowedRoles.map(r => normalizeRole(r));

    // Super Admin has universal access to all admin/editor actions
    if (userRoleNorm === 'Super Admin') {
      return next();
    }

    if (!normalizedAllowed.includes(userRoleNorm)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Your role '${req.user.role}' does not have sufficient permissions to perform this action.`
      });
    }

    next();
  };
}

