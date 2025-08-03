"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetToken = exports.createResetToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const createToken = (userId) => {
    const secret = env_1.ENV.JWT_SECRET;
    const payload = { userId };
    const options = { expiresIn: "7d" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        if (!decoded ||
            typeof decoded !== "object" ||
            !("userId" in decoded) ||
            typeof decoded.userId !== "string") {
            return null;
        }
        return decoded;
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const createResetToken = (userId) => {
    const secret = env_1.ENV.JWT_RESET_SECRET;
    const payload = { userId };
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.createResetToken = createResetToken;
const verifyResetToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_RESET_SECRET);
        if (!decoded ||
            typeof decoded !== "object" ||
            !("userId" in decoded) ||
            typeof decoded.userId !== "string") {
            return null;
        }
        return decoded;
    }
    catch {
        return null;
    }
};
exports.verifyResetToken = verifyResetToken;
//# sourceMappingURL=jwt.js.map