"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const env_1 = require("../../../config/env");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const result = await authService.register(name, email, password);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);
            res.cookie("candleaf_token", token, {
                httpOnly: true,
                secure: env_1.ENV.NODE_ENV === "production",
                sameSite: env_1.ENV.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });
            console.log("cookie sent the token ", token);
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    async googleLogin(req, res) {
        try {
            const { token: accessToken } = req.body;
            const { token, user } = await authService.loginWithGoogle(accessToken);
            res.cookie("candleaf_token", token, {
                httpOnly: true,
                secure: env_1.ENV.NODE_ENV === "production",
                sameSite: env_1.ENV.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });
            res.status(200).json({ user });
        }
        catch (error) {
            console.error("Google login error:", error);
            res.status(401).json({ message: "Google login failed" });
        }
    }
    async logout(req, res) {
        try {
            const userId = req.body.user?.id;
            res.clearCookie("candleaf_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000,
                path: "/",
            });
            const result = await authService.logout(userId);
            res.status(200).json(result);
        }
        catch (error) {
            console.error("Logout error:", error);
            res.status(500).json({ message: "Logout failed" });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await authService.forgotPassword(email);
            res.status(200).json({
                message: "If an account with that email exists, a reset link has been sent.",
            });
        }
        catch (error) {
            console.error("Forgot password error:", error);
            res.status(400).json({ message: "Error sending reset link" });
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await authService.resetPassword(token, newPassword);
            res.status(200).json({
                message: "Password has been successfully reset.",
            });
        }
        catch (error) {
            console.error("Reset password error:", error);
            res.status(400).json({ message: "Invalid or expired reset token" });
        }
    }
}
exports.AuthController = AuthController;
