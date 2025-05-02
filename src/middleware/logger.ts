import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const logRequest = (req: Request, _res: Response, next: NextFunction): void => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
};

export const logHttpError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (res.statusCode >= 400) {
    logger.error(`HTTP Error: ${res.statusCode} - ${req.method} ${req.originalUrl}`, {
      error: err.message,
      stack: err.stack,
    });
  }
  next(err);
};


export const logUnhandledError = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error("Unhandled exception occurred", { error: err.message, stack: err.stack });
  res.status(500).send("Something went wrong!");
};
