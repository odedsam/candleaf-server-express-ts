import { Document } from 'mongoose';
import { Request } from 'express';

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  email_verified_at?: string | null;
  role?: "user" | "admin";
  provider?: "google" | "local";
  resetToken?:string
  cookies: Record<string, string>;
  resetTokenExp?:Date,
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload
}

export interface GoogleUser {
  id:string;
  name: string
  email: string
  avatar?: string
}

export interface UserDocument extends Document {
  _id: any;
  name: string;
  email: string;
}
