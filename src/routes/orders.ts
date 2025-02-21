import { Router } from "express";
import { getOrders } from "../controllers/orderController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, getOrders);

export default router;
