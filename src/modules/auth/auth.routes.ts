import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema, googleAuthSchema } from "../../schemas/authSchema";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/google", validate(googleAuthSchema), AuthController.googleAuth);

export default router;