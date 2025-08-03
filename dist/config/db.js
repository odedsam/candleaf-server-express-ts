"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSession = exports.connectDB = void 0;
const env_1 = require("./env");
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.ENV.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,
            ssl: true,
        });
        console.log("Connected To MongoDB");
    }
    catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const configureSession = (app) => {
    app.use((0, express_session_1.default)({
        secret: env_1.ENV.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            mongoUrl: env_1.ENV.MONGO_URI,
            collectionName: "sessions",
            mongoOptions: {
                serverSelectionTimeoutMS: 60000,
                ssl: true,
            },
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: env_1.ENV.NODE_ENV === "production",
        },
    }));
};
exports.configureSession = configureSession;
