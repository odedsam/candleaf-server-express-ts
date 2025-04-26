import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

interface UserPayload {
  userId: string;
}

export const createToken = (userId: string): string => {
  const secret = ENV.JWT_SECRET as string;
  const payload: UserPayload = { userId };
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): Promise<UserPayload | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, ENV.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return resolve(null);
      }
      resolve(decoded as UserPayload);
    });
  });
};
