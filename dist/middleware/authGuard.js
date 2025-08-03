"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authGuard = void 0;
const jwt_1 = require("../utils/jwt");
const user_repo_1 = require("../modules/v1/user/user.repo");
const userRepo = new user_repo_1.UserRepository();
const authGuard = async (req, res, next) => {
    try {
        const token = req.cookies?.candleaf_token;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized - No token' });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        const user = await userRepo.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authGuard = authGuard;
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Admins only' });
    }
    return next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=authGuard.js.map