"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envSchema_1 = require("../schemas/envSchema");
const isProduction = process.env.NODE_ENV === "production";
const envFile = isProduction ? ".env.production" : ".env";
dotenv_1.default.config({ path: envFile });
const validatedEnv = envSchema_1.envSchema.parse(process.env);
const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "JWT_RESET_SECRET", "SESSION_SECRET", "NODE_ENV", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET_ID", "SUPPORT_EMAIL", "SENDGRID_API_KEY"];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(` Missing required environment variable: ${varName}`);
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
    origin: ['http://localhost:5173', 'https://candleaf-front.vercel.app'],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};
//# sourceMappingURL=env.js.map