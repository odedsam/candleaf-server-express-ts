import dotenv from "dotenv";
import { envSchema } from "../schemas/envSchema";

const isProduction = process.env.NODE_ENV === "production";

const envFile = isProduction ? ".env.production" : ".env";
dotenv.config({ path: envFile });

const validatedEnv = envSchema.parse(process.env);

const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "SESSION_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET_ID"];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(` Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

export const ENV = {
  MONGO_URI: validatedEnv.MONGO_URI,
  JWT_SECRET: validatedEnv.JWT_SECRET,
  SESSION_SECRET: validatedEnv.SESSION_SECRET,
  GOOGLE_CLIENT_ID: validatedEnv.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID: validatedEnv.GOOGLE_SECRET_ID,
  PORT: Number(validatedEnv.PORT),
  NODE_ENV: isProduction ? "production" : "development",
};

const vercelDev = 'http://localhost:3000';
const vercelProd = 'https://candleaf-front.vercel.app';
const dev = 'http://localhost:5173';

const origins = process.env.NODE_ENV === 'production'
  ? [vercelProd]
  : [vercelProd, vercelDev, dev];



export const corsOptions = {
  origin: origins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials:true,
  optionsSuccessStatus: 204,
};
