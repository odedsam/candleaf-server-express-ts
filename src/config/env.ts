import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "PORT", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(` Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

export const ENV = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
};
