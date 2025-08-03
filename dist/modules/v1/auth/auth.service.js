"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_repo_1 = require("./auth.repo");
const jwt_1 = require("../../../utils/jwt");
const google_provider_1 = require("../../../providers/google.provider");
const user_repo_1 = require("../user/user.repo");
const sendgrid_provider_1 = require("../../../providers/sendgrid.provider");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authRepo = new auth_repo_1.AuthRepository();
const userRepo = new user_repo_1.UserRepository();
class AuthService {
    async register(name, email, password) {
        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = (await userRepo.create({ name, email, provider: "local" }));
        const fetchedUser = await userRepo.findById(user._id);
        await authRepo.create({
            user: user._id,
            provider: "local",
            password: hashedPassword,
        });
        return { user: fetchedUser, token: (0, jwt_1.createToken)(user._id.toString()) };
    }
    async login(email, password) {
        const user = await userRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const auth = await authRepo.findByUserId(user._id);
        if (!auth || !auth.password) {
            throw new Error("Invalid login method");
        }
        const isMatch = await bcryptjs_1.default.compare(password, auth.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        return { user, token: (0, jwt_1.createToken)(user._id.toString()) };
    }
    async loginWithGoogle(accessToken) {
        const googleUser = await (0, google_provider_1.fetchGoogleUser)(accessToken);
        if (!googleUser?.id || !googleUser?.email) {
            throw new Error("Invalid Google user data: missing ID Or Email");
        }
        let user = await userRepo.findByEmail(googleUser.email);
        if (!user) {
            user = await userRepo.create({
                name: googleUser.name || "No Name",
                avatar: googleUser.avatar || "",
                email: googleUser.email,
                provider: "google",
            });
            await authRepo.create({
                user: user._id,
                provider: "google",
                providerId: googleUser.id,
            });
        }
        return { user, token: (0, jwt_1.createToken)(user._id.toString()) };
    }
    async logout(userId) {
        if (!userId) {
            console.warn("Logout attempt without userId");
            return { message: "Logged out successfully (no user session found)" };
        }
        try {
            console.log(`User ${userId} logged out successfully.`);
            return { message: "Logged out successfully" };
        }
        catch (error) {
            console.error(`Logout error for user ${userId}:`, error);
            throw new Error("Failed to logout user");
        }
    }
    async verifyToken(token) {
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded?.userId) {
                return null;
            }
            const user = await userRepo.findById(decoded.userId);
            return user;
        }
        catch (error) {
            return null;
        }
    }
    async forgotPassword(email) {
        const user = await userRepo.findByEmail(email);
        if (!user)
            return;
        // const devUrl =`http://localhost:5173`;
        const token = (0, jwt_1.createResetToken)(user.id);
        const prodUrl = `https://candleaf-front.vercel.app`;
        const resetLink = `${prodUrl}/auth/reset-password?token=${token}`;
        await (0, sendgrid_provider_1.sendForgotPasswordEmail)(email, resetLink);
    }
    async resetPassword(token, newPassword) {
        try {
            const decoded = await (0, jwt_1.verifyResetToken)(token);
            if (!decoded)
                throw new Error("Invalid or expired reset token");
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
            await userRepo.update(decoded.userId, { password: hashedPassword });
            const user = await userRepo.findById(decoded.userId);
            if (user) {
                await (0, sendgrid_provider_1.sendResetPasswordConfirmationEmail)(user.email);
            }
        }
        catch (err) {
            throw new Error("Invalid or expired reset token");
        }
    }
}
exports.AuthService = AuthService;
