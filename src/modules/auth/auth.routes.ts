import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema, googleAuthSchema } from "../../schemas/authSchema";

const router = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req:Request, res:Response, next:NextFunction) => fn(req, res, next).catch(next);

router.post("/google", validate(googleAuthSchema), asyncHandler(AuthController.googleAuth));
router.post("/register", validate(registerSchema), asyncHandler(AuthController.register));
router.post("/login", validate(loginSchema), asyncHandler(AuthController.login));

export default router;
