"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.ENV = void 0;
const envSchema_1 = require("../schemas/envSchema");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const validatedEnv = envSchema_1.envSchema.parse(process.env);
const requiredEnvVars = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_RESET_SECRET",
    "SESSION_SECRET",
    "NODE_ENV",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_SECRET_ID",
    "SUPPORT_EMAIL",
    "SENDGRID_API_KEY",
];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});
exports.ENV = {
    MONGO_URI: validatedEnv.MONGO_URI,
    JWT_SECRET: validatedEnv.JWT_SECRET,
    JWT_RESET_SECRET: validatedEnv.JWT_RESET_SECRET,
    SESSION_SECRET: validatedEnv.SESSION_SECRET,
    GOOGLE_CLIENT_ID: validatedEnv.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: validatedEnv.GOOGLE_SECRET_ID,
    SUPPORT_EMAIL: validatedEnv.SUPPORT_EMAIL,
    SENDGRID_API_KEY: validatedEnv.SENDGRID_API_KEY,
    PORT: Number(validatedEnv.PORT),
    NODE_ENV: isProduction ? "production" : "development",
};
exports.corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://candleaf-front.vercel.app",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};
