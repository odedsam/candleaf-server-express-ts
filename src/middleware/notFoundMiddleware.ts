import { Response, Request, NextFunction } from "express";

export const notFoundMiddleware = (_: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Route does not exist!" });
};
