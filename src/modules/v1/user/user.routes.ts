import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { editUserSchema } from "../../../schemas/userSchema";

const router = Router();

router.get("/:id", UserController.getProfile);
router.put("/:id", validateRequest(editUserSchema), UserController.updateProfile);
router.delete("/:id", UserController.deleteUser);

export default router;
