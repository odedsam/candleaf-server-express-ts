"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authGuard = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};
exports.authGuard = authGuard;
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Forbidden');
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=authGuard.js.map