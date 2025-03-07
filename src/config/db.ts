import mongoose from "mongoose";
import { ENV } from "./env";

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
