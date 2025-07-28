"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repo_1 = require("./user.repo");
const userRepo = new user_repo_1.UserRepository();
class UserService {
    async getUserProfile(userId) {
        return await userRepo.findById(userId);
    }
    async updateUser(userId, updateData) {
        return await userRepo.update(userId, updateData);
    }
    async deleteUser(userId) {
        return await userRepo.delete(userId);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map