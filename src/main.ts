import express from "express";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

// It means all routes inside authRoutes will start with /api/auth.
// 	•	If a route inside auth.ts is /signup, the final URL will be:
// http://localhost:5000/api/auth/signup

app.listen(ENV.PORT, () => console.log(` Server running on port ${ENV.PORT}`));
