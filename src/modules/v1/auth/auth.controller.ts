import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();
interface AuthenticateUserRequest {
  user?: {
    id: string;
  };
}

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const result = await authService.register(name, email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

   async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      const { token: accessToken } = req.body;
      const googleUser = await authService.loginWithGoogle(accessToken);

      if (!googleUser) {
        res.status(401).json({ message: "Invalid Google Token " });
      }
      res.status(200).json(googleUser);
    } catch (error: any) {
      console.error("Google login error:", error);
      res.status(401).json({ message: "Google login failed" });
    }
  }


  async logout(req: Request<AuthenticateUserRequest>, res: Response) {
    try {
      const userId = req.body.user?.id;
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      const result = await authService.logout(userId);

      res.status(200).json(result);
    } catch (error: any) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  }
  async authenticate(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
      }
      const user = await authService.verifyToken(token);
      if (user) {
        (req as any).user = user;
        res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
      }
    } catch (error: any) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  }
}
