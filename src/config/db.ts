import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { ENV } from "./env";
import { Express } from "express";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected To MongoDB");
  } catch (err: any) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export const configureSession = (app: Express) => {
  app.use(
    session({
      secret: ENV.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: ENV.MONGO_URI,
        collectionName: "sessions",
        mongoOptions: { serverSelectionTimeoutMS: 5000,},
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
      },
    })
  );
};
