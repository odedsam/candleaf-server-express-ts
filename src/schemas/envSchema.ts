import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/, "PORT must be a number").default("5001"),
  MONGO_URI: z.string().url("MONGO_URI must be a valid URL"),
  SESSION_SECRET: z.string().min(1, "SESSION_SECRET is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_RESET_SECRET: z.string().min(1, "JWT_RESET_SECRET is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_SECRET_ID: z.string().min(1, "GOOGLE_SECRET_ID is required"),
  SENDGRID_API_KEY: z.string().min(1, "SENDGRID_APIKEY is required"),
  SUPPORT_EMAIL: z.string().min(1, "SUPPORT_EMAIL is required"),
  NODE_ENV: z.string().refine(val => val === "development" || val === "production", {message: "NODE_ENV must be 'development' or 'production'",}).default("development"),
});
