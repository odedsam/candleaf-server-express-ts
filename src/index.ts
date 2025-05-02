import { corsOptions, ENV } from "./config/env";
import { connectDB, configureSession } from "./config/db";
import { httpLogger} from "./middleware/logger";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use(httpLogger);

app.use("/api", routes);
configureSession(app);



connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => console.log(` Server running on port ${ENV.PORT}`));
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
