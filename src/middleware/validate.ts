import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =(schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }

    req.body = result.data;
    next();
  };
