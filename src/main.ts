import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";
import session from "express-session";
import { corsOptions, ENV } from "@/config/env";
import { connectDB } from "@/config/db";
import { logger } from "@/middleware/logger";

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);

app.use(
  session({
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger);

connectDB();
app.listen(ENV.PORT, () =>console.log(`🚀 Server running on port ${ENV.PORT}`));


