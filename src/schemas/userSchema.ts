import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  authMethod: z.enum(["local", "google"]),
  role: z.enum(["user", "admin"]).default("user"),
  profileImage: z.string()
    .url("Invalid URL format")
    .nullable()
    .optional(), 
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
   
});


export const editUserSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .optional(),
    profileImage: z.string()
      .url("Invalid URL format")
      .nullable()
      .optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});