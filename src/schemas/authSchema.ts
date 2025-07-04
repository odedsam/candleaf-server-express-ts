import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const googleAuthSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  profileImage: z.string().url("Invalid URL format").optional(),
});



export const googleLoginSchema = z.object({
  token: z.string().min(1, "Missing token"),
});

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
