import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(issue.message);
      });

      res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
