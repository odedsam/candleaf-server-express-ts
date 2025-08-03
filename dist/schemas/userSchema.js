"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special symbol (e.g., !@#$)"),
    provider: zod_1.z.enum(["local", "google"]),
    role: zod_1.z.string().optional().default("user"),
    profileImage: zod_1.z.string()
        .url("Invalid URL format")
        .nullable()
        .optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.editUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string()
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name must be at most 50 characters")
            .optional(),
        profileImage: zod_1.z.string()
            .url("Invalid URL format")
            .nullable()
            .optional(),
        role: zod_1.z.enum(["user", "admin"]).optional(),
    }),
});
