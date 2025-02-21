import { Router } from "express";
import { signup, login, googleAuth, refreshAccessToken } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { userSchema } from "../schemas/userSchema";

const router = Router();

router.post("/signup", validate(userSchema), signup);
router.post("/login", validate(userSchema.omit({ name: true })), login);
router.post("/google", googleAuth); // google sign-in & sign-Up
router.post("/refresh-token", refreshAccessToken); // refresh token API

export default router;
