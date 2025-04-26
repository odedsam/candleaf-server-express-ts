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
const originUrl = ENV.NODE_ENV === "development" ? "https://candleaf-front.vercel.app": "http://localhost:5173"

export const corsOptions = {
  origin: originUrl,
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
};
