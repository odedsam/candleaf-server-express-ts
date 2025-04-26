import { Router, RequestHandler } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "@/middleware/validateRequest";
import { registerSchema, googleLoginSchema, emailPasswordSchema } from "@/schemas/authSchema";
import { authGuard } from "@/middleware/authGuard";

const router = Router();
const authController = new AuthController();

const bindHandler = (controller: any, method: string): RequestHandler => {
  return controller[method].bind(controller) as RequestHandler;
};

router.post("/google", validateRequest(googleLoginSchema), bindHandler(authController, "googleLogin"));
router.post("/register", validateRequest(registerSchema), bindHandler(authController, "register"));
router.post("/login", validateRequest(emailPasswordSchema), bindHandler(authController, "login"));
router.post("/verify", authGuard, bindHandler(authController, "authenticate"));
router.post("/logout", authGuard, bindHandler(authController, "logout"));
router.get("/authenticate", bindHandler(authController, "authenticate"));

export default router;
