import { Request,Response,NextFunction } from "express";

export const logger =((req:Request, _res:Response, next:NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
