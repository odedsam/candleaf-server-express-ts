import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err: any) {
    console.error("MongoDB Connection Error", err);
    process.exit(1);
  }
};
