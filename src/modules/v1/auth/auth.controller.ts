import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ENV } from "../../../config/env";

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
      res.cookie("candleaf_token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      console.log("cookie sent the token ", token);
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }

  async googleLogin(req: Request, res: Response) {
    try {
      const { token: accessToken } = req.body;
      const { token, user } = await authService.loginWithGoogle(accessToken);

      res.cookie("candleaf_token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      res.status(200).json({ user });
    } catch (error: any) {
      console.error("Google login error:", error);
      res.status(401).json({ message: "Google login failed" });
    }
  }

  async logout(req: Request<AuthenticateUserRequest>, res: Response) {
    try {
      const userId = req.body.user?.id;
      res.clearCookie("candleaf_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });
      const result = await authService.logout(userId);

      res.status(200).json(result);
    } catch (error: any) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.status(200).json({
        message: "If an account with that email exists, a reset link has been sent.",
      });
    } catch (error: any) {
      console.error("Forgot password error:", error);
      res.status(400).json({ message: "Error sending reset link" });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await authService.resetPassword(token, newPassword);
      res.status(200).json({
        message: "Password has been successfully reset.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      res.status(400).json({ message: "Invalid or expired reset token" });
    }
  }
}
