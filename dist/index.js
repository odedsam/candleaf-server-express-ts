"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const logger_1 = require("./middleware/logger");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(env_1.corsOptions));
app.options("*", (0, cors_1.default)(env_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(logger_1.httpLogger);
app.use("/api", routes_1.default);
(0, db_1.configureSession)(app);
(0, db_1.connectDB)()
    .then(() => {
    const portToListen = env_1.ENV.PORT || 8080;
    console.log(`App Port: ${portToListen}`);
    app.listen(portToListen, () => console.log(`Server running on port ${portToListen}`));
})
    .catch((error) => {
    console.error("Failed to start the server:", error);
});
