import mongoose from "mongoose";
// import { MongoClient, ServerApiVersion } from "mongodb";
import { ENV } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Optional: Adjust timeout
    });
    console.log("Connected To MongoDB");
  } catch (err: any) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// Optional: Use MongoClient for direct MongoDB operations
// export const connectMongoClient = async () => {
//   const client = new MongoClient(ENV.MONGO_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("✅ MongoClient Ping Successful!");
//   } catch (err: any) {
//     console.error("❌ MongoClient Connection Error:", err);
//   } finally {
//     await client.close(); // Close connection when done
//   }
// };
