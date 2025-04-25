import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

// Ensure ENV.JWT_SECRET is a string
const JWT_SECRET: Secret = ENV.JWT_SECRET as string;

// Set token expiration times
const ACCESS_TOKEN_EXPIRY = "15m"; // Short lifespan for security
const REFRESH_TOKEN_EXPIRY = "7d"; // Now stored in localStorage

// Generate a JWT Token
export const generateToken = (tokenId: string, expiresIn: SignOptions["expiresIn"]) => {
  return jwt.sign({ id: tokenId }, JWT_SECRET, { expiresIn });
};

//  Generate Access & Refresh Tokens
export const generateTokens = (tokenId: string) => ({
  accessToken: generateToken(tokenId, ACCESS_TOKEN_EXPIRY),
  refreshToken: generateToken(tokenId, REFRESH_TOKEN_EXPIRY),
});

// Verify JWT Token (Access/Refresh)
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

// Refresh Token Verification & Regeneration
export const verifyRefreshToken = async (refreshToken: string) => {
  const { valid, payload } = verifyToken(refreshToken);
  if (!valid || !payload?.id) throw new Error("Invalid refresh token");

  // Return new tokens if refresh token is valid
  return generateTokens(payload.id);
};

//  Decode a token without verification (to check expiration)
export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  return decoded ? { ...decoded, expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : null } : null;
};
