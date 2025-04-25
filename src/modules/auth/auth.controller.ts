import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { GoogleAuthService } from "./googleAuth.service";

const authService = new AuthService();
const googleAuthService = new GoogleAuthService();

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const result = await authService.register(name, email, password);

      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken, 
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.json({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken, 
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential } = req.body;
      if (!credential) {
        return res.status(400).json({ message: "Google credential is required" });
      }

      const result = await googleAuthService.authenticateGoogleUser(credential);

      res.json({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken, 
      });
    } catch (error) {
      next(error);
    }
  }
}