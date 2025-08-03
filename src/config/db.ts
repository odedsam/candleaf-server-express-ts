import { ENV } from "./env";
import mongoose from "mongoose";


export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI!, {
      serverSelectionTimeoutMS:20000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

