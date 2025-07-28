"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const userService = new user_service_1.UserService();
class UserController {
    static async getProfile(req, res) {
        try {
            const user = await userService.getUserProfile(req.params.id);
            res.json(user);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async updateProfile(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map