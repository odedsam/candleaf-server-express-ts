import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { GoogleAuthService } from "./googleAuth.service";

const authService = new AuthService();
const googleAuthService = new GoogleAuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const result = await authService.register(name, email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async googleAuth(req: Request, res: Response) {
    try {
      const { name, email, googleId } = req.body;
      const result = await googleAuthService.findOrCreateGoogleUser(name, email, googleId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}