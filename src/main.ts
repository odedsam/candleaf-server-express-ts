import express from "express";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import cors from "cors";
import routes from "./routes"; 
import passport from "passport";
import session from "express-session";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

const corsOptions = cors({
  origin: "http://localhost:5173",
  credentials:true,
});
app.use(
  session({
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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