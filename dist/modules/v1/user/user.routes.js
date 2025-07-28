"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const userSchema_1 = require("../../../schemas/userSchema");
const router = (0, express_1.Router)();
router.get("/:id", user_controller_1.UserController.getProfile);
router.put("/:id", (0, validateRequest_1.validateRequest)(userSchema_1.editUserSchema), user_controller_1.UserController.updateProfile);
router.delete("/:id", user_controller_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map