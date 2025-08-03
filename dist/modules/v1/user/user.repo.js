"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("./user.model");
class UserRepository {
    async create(userData) {
        return await user_model_1.UserModel.create(userData);
    }
    async findById(userId) {
        return await user_model_1.UserModel.findById(userId);
    }
    async findByEmail(email) {
        return await user_model_1.UserModel.findOne({ email }).exec();
    }
    async update(userId, updateData) {
        return await user_model_1.UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    }
    async delete(userId) {
        return await user_model_1.UserModel.findByIdAndDelete(userId);
    }
}
exports.UserRepository = UserRepository;
