import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export interface UserJWTPayload {
  userId: string;
}

export const createToken = (userId: string): string => {
  const secret = ENV.JWT_SECRET as string;
  const payload: UserJWTPayload = { userId };
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): UserJWTPayload | null => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET as string);
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      typeof (decoded as any).userId !== "string"
    ) {
      return null;
    }
    return decoded as UserJWTPayload;
  } catch {
    return null;
  }
};

export const createResetToken = (userId: string): string => {
  const secret = ENV.JWT_RESET_SECRET as string;
  const payload: UserJWTPayload = { userId };
  const options: SignOptions = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

export const verifyResetToken = (token: string): UserJWTPayload | null => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_RESET_SECRET as string);
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      typeof (decoded as any).userId !== "string"
    ) {
      return null;
    }
    return decoded as UserJWTPayload;
  } catch {
    return null;
  }
};
