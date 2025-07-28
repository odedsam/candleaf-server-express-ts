"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const { user, token } = await authService.register(name, email, password);
            req.session.token = token;
            req.session.user = user ? { _id: user._id.toString(), name: user.name, email: user.email } : undefined;
            res.status(201).json({ user: req.session.user, token });
        }
        catch (err) {
            res.status(400).json({ message: err.message || "Registration failed" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            req.session.token = token;
            req.session.user = user ? { _id: user._id.toString(), name: user.name, email: user.email } : undefined;
            res.status(200).json({ user: req.session.user, token });
        }
        catch (err) {
            res.status(401).json({ message: err.message || "Login failed" });
        }
    }
    async loginWithGoogle(req, res) {
        try {
            const { accessToken } = req.body;
            const { user, token } = await authService.loginWithGoogle(accessToken);
            req.session.token = token;
            req.session.user = user ? { _id: user._id.toString(), name: user.name, email: user.email } : undefined;
            res.status(200).json({ user: req.session.user, token });
        }
        catch (err) {
            res.status(401).json({ message: err.message || "Google login failed" });
        }
    }
    async logout(req, res) {
        try {
            const userId = req.session.user?._id;
            req.session.token = undefined;
            req.session.user = undefined;
            if (userId) {
                await authService.logout(userId);
            }
            res.status(200).json({ message: "Logged out successfully" });
        }
        catch (err) {
            res.status(400).json({ message: err.message || "Logout failed" });
        }
    }
    async verifyToken(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token missing" });
            }
            const user = await authService.verifyToken(token);
            if (!user) {
                return res.status(401).json({ message: "Invalid token" });
            }
            res.status(200).json({
                user: {
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (err) {
            res.status(401).json({ message: err.message || "Token verification failed" });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await authService.forgotPassword(email);
            res.status(200).json({ message: "Password reset email sent if user exists" });
        }
        catch (err) {
            res.status(400).json({ message: err.message || "Failed to send reset email" });
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await authService.resetPassword(token, newPassword);
            res.status(200).json({ message: "Password reset successfully" });
        }
        catch (err) {
            res.status(400).json({ message: err.message || "Password reset failed" });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map