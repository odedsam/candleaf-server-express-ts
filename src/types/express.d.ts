import { Request } from "express";
import { ServerResponse } from 'http';
import { Document } from 'mongoose';
import { IncomingMessage } from 'http';

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}


declare module 'http' {
  interface ServerResponse {
    responseTime?: number;
  }
}

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  email_verified_at?: string | null;
  role?: 'user' | 'admin';
  provider?: 'google' | 'local';
  resetToken?: string;
  resetTokenExp?: Date;
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserDocument extends Document {
  _id: any;
  name: string;
  email: string;
}

/**
 * Augment Express Request to include:
 *  - user (decoded JWT user payload)
 *  - cookies (from cookie-parser)
 */
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      cookies: Record<string, string>;
    }
  }
}
