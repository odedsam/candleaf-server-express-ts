import type { Express } from "express";
import { ENV } from "./env";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS:20000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export const configureSession = (app: Express): void => {
  app.use(
    session({
      secret: ENV.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: ENV.MONGO_URI,
        collectionName: "sessions",
        mongoOptions: {
          serverSelectionTimeoutMS: 20000,
        },
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
      },
    })
  );
};
