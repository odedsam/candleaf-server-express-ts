import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT","MONGO_URI", "SESSION_SECRET", "JWT_LIFETIME", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET_ID"];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(` Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

export const ENV = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_LIFETIME: process.env.JWT_LIFETIME as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID as string,
  PORT: process.env.PORT ? Number(process.env.PORT) : 5002,
};
