import { Response } from "express";

// @ts-ignore
export const errorHandler = (err: Error, req, res: Response, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
};
