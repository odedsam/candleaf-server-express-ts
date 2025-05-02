import { Request } from "express";
import { ServerResponse } from 'http';
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
