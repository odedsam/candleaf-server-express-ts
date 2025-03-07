import express from "express";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import cors from "cors";
import routes from "./routes"; 
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

const corsOptions = cors({
  origin: "http://localhost:5173",
  credentials: true,
});

app.use(express.json());
app.use(corsOptions);

app.use("/api", routes);

// Middleware 
app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

connectDB();
app.listen(ENV.PORT, () =>
  console.log(`🚀 Server running on port ${ENV.PORT}`)
);