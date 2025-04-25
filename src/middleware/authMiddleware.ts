// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { ENV } from "../config/env";

// export interface AuthenticatedRequest extends Request {
//   user?: JwtPayload | string;
// }

// export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Unauthorized: Missing token" });
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Error:", error);
//     res.status(403).json({ message: "Forbidden: Invalid or expired token" });
//     return;
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    (req as any).user = { id: verified.id }; // ✅ הוספת `user` לבקשה
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};