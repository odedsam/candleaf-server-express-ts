import { corsOptions, ENV } from "./config/env";
import { connectDB, configureSession } from "./config/db";
import { httpLogger } from "./middleware/logger";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

configureSession(app);

app.use("/api", routes);
app.use(httpLogger);



connectDB()
  .then(() => {
    console.log("Railway Port:", ENV.PORT)
    const portToListen = ENV.PORT;
    app.listen(portToListen, () => console.log(` Server running on port ${portToListen}`));
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
