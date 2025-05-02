import dotenv from "dotenv";
import { envSchema } from "../schemas/envSchema";

const isProduction = process.env.NODE_ENV === "production";

const envFile = isProduction ? ".env.production" : ".env";
dotenv.config({ path: envFile });

const validatedEnv = envSchema.parse(process.env);

const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "SESSION_SECRET","NODE_ENV", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET_ID"];

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



// const origins = process.env.NODE_ENV === 'production'
//   ? [vercelProd]
//   : [vercelProd, vercelDev, dev];

// const inspectUrl = 'https://vercel.com/fragged-ups-projects/candleaf-front/C6DY56c4rwS387M4Q17Apag9hFXz';
// const stagingUrl ='https://candleaf-front-5hobrpis7-fragged-ups-projects.vercel.app';
// const devUrl = 'http://localhost:3000';
// const localDevUrl = 'http://localhost:5001';
// const productionUrl ='https://candleaf-front.vercel.app';

// const origins = [inspectUrl,stagingUrl,devUrl,localDevUrl,productionUrl]

export const corsOptions = {
  origin:'*',
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};
