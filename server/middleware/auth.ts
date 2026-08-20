import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { UserRole } from '../models/types';
import { db } from '../services/dataStore';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
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

  // Verify user is still active in system
  const user = db.users.find(u => u._id === payload.userId);
  if (user && !user.isActive) {
    return res.status(403).json({
      success: false,
      message: 'User account has been deactivated.'
    });
  }

  req.user = payload;
  next();
}

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. User context missing.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Your role '${req.user.role}' does not have sufficient permissions to perform this action.`
      });
    }

    next();
  };
}
