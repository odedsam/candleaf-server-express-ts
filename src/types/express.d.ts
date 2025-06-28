import { Request } from "express";
import { ServerResponse } from "http";
import { IncomingMessage } from "http";
import session from "express-session";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

declare module "http" {
  interface ServerResponse {
    responseTime?: number;
  }
}

declare module "express-session" {
  interface SessionData {
    token?: string;
    user?: {
      _id: string;
      name?: string;
      email?: string;
    };
  }
}
