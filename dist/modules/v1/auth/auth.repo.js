"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_model_1 = require("./auth.model");
class AuthRepository {
    async create(authData) {
        return await auth_model_1.AuthModel.create(authData);
    }
    async findByUserId(userId) {
        return await auth_model_1.AuthModel.findOne({ user: userId });
    }
    async findByEmail(email) {
        return await auth_model_1.AuthModel.findOne({ email: email });
    }
    async findByProviderId(providerId) {
        return await auth_model_1.AuthModel.findOne({ providerId });
    }
    async findByResetToken(resetToken) {
        return await auth_model_1.AuthModel.findOne({ resetToken });
    }
    async updateResetToken(userId, resetToken, resetTokenExp) {
        return await auth_model_1.AuthModel.findOneAndUpdate({ user: userId }, { resetToken, resetTokenExp });
    }
    async update(userId, updateData) {
        return await auth_model_1.AuthModel.findByIdAndUpdate(userId, updateData, { new: true });
    }
    async verifyEmail(userId) {
        return await auth_model_1.AuthModel.findOneAndUpdate({ user: userId }, { email_verified_at: new Date().toISOString() });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repo.js.map