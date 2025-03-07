import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

// Ensure ENV.JWT_SECRET is a string
const JWT_SECRET: Secret = ENV.JWT_SECRET as string;

// Generate a token (Access/Refresh)
export const generateToken = (tokenId: string, expiresIn: SignOptions["expiresIn"]) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign({ id: tokenId }, JWT_SECRET, options);
};

// Generate Access & Refresh Tokens
export const generateTokens = (tokenId: string) => ({
  accessToken: generateToken(tokenId, "21d"),
  refreshToken: generateToken(tokenId, "31d"),
});

// Verify token (Access/Refresh)
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return {
      valid: true,
      payload: decoded,
      expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : null,
    };
  } catch {
    return { valid: false, payload: null, expiresAt: null };
  }
};

// Decode a token without verification (to check expiration)
export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  return decoded ? { ...decoded, expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : null } : null;
};