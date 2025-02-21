import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

// generate Access & Refresh Tokens
export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// verify Access Token
export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// verify Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
