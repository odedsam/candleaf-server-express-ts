"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.string().regex(/^\d+$/, "PORT must be a number").default("5001"),
    MONGO_URI: zod_1.z.string().url("MONGO_URI must be a valid URL"),
    SESSION_SECRET: zod_1.z.string().min(1, "SESSION_SECRET is required"),
    JWT_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_RESET_SECRET: zod_1.z.string().min(1, "JWT_RESET_SECRET is required"),
    GOOGLE_CLIENT_ID: zod_1.z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    GOOGLE_SECRET_ID: zod_1.z.string().min(1, "GOOGLE_SECRET_ID is required"),
    SENDGRID_API_KEY: zod_1.z.string().min(1, "SENDGRID_APIKEY is required"),
    SUPPORT_EMAIL: zod_1.z.string().min(1, "SUPPORT_EMAIL is required"),
    NODE_ENV: zod_1.z.string().refine(val => val === "development" || val === "production", { message: "NODE_ENV must be 'development' or 'production'", }).default("development"),
});
