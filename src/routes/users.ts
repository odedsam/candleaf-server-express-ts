import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

export default router;
