import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    (req as AuthRequest).user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
