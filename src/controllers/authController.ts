import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { verifyGoogleToken } from "../services/googleAuthService";
import { verifyRefreshToken, generateTokens } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const tokens = await registerUser(name, email, password);
    res.status(201).json(tokens);
  } catch (error) {
    const err = error as Error; // explicitly type error
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const tokens = await loginUser(email, password);
    res.json(tokens);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ message: "Google token is required" });
      return;
    }

    const tokens = await verifyGoogleToken(token);
    res.json(tokens);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh Token Required" });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      res.status(403).json({ message: "Invalid Refresh Token" });
      return;
    }

    const userId = (decoded as JwtPayload).id;

    const newTokens = generateTokens(userId);
    res.json(newTokens);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
