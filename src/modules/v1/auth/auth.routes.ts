import { RequestHandler, Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../../middleware/authGuard";
import { emailPasswordSchema, googleLoginSchema } from "../../../schemas/authSchema";
import { validateRequest } from "../../../middleware/validateRequest";
import { registerSchema } from "../../../schemas/userSchema";

const router = Router();
const authController = new AuthController();

const bindHandler = (controller: any, method: string): RequestHandler => {
  return async (req, res, next) => {
    try {
      await controller[method](req, res);
    } catch (error) {
      next(error);
    }
  };
};

router.post("/google", validateRequest(googleLoginSchema), bindHandler(authController, "googleLogin"));
router.post("/register", validateRequest(registerSchema), bindHandler(authController, "register"));
router.post("/login", validateRequest(emailPasswordSchema), bindHandler(authController, "login"));
router.post("/verify", authGuard, bindHandler(authController, "authenticate"));
router.post("/logout", authGuard, bindHandler(authController, "logout"));
router.get("/authenticate", bindHandler(authController, "authenticate"));

export default router

