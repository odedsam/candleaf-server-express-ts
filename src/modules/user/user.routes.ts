import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middleware/validate";
import { editUserSchema } from "../../schemas/userSchema";

const router = Router();

router.get("/:id", UserController.getProfile);
router.put("/:id", validate(editUserSchema), UserController.updateProfile);
router.delete("/:id", UserController.deleteUser);

export default router;