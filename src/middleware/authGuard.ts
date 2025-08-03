import { Request, Response, NextFunction } from 'express'
import {  verifyToken } from '../utils/jwt'
import { UserRepository } from '../modules/v1/user/user.repo'

const userRepo = new UserRepository()

export interface AuthenticatedRequestV extends Request {
  user?: any
}
export const authGuard = async (
  req: AuthenticatedRequestV,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.candleaf_token;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No token' });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const user = await userRepo.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequestV,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden - Admins only' })
  }
  return next()
}
