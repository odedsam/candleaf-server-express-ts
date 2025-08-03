"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authGuard_1 = require("../../../middleware/authGuard");
const authSchema_1 = require("../../../schemas/authSchema");
const validateRequest_1 = require("../../../middleware/validateRequest");
const userSchema_1 = require("../../../schemas/userSchema");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
const bindHandler = (controller, method) => {
    return async (req, res, next) => {
        try {
            await controller[method](req, res);
        }
        catch (error) {
            next(error);
        }
    };
};
router.post("/google", (0, validateRequest_1.validateRequest)(authSchema_1.googleLoginSchema), bindHandler(authController, "googleLogin"));
router.post("/register", (0, validateRequest_1.validateRequest)(userSchema_1.registerSchema), bindHandler(authController, "register"));
router.post("/login", (0, validateRequest_1.validateRequest)(authSchema_1.emailPasswordSchema), bindHandler(authController, "login"));
router.post("/verify", authGuard_1.authGuard, (req, res, _next) => {
    res.status(200).json(req.user);
});
router.post("/logout", authGuard_1.authGuard, bindHandler(authController, "logout"));
router.post("/forgot-password", bindHandler(authController, "forgotPassword"));
router.post("/reset-password", bindHandler(authController, "resetPassword"));
exports.default = router;
