import { Router, RequestHandler } from "express";
import { getAllOrders, updateOrderStatus } from "./admin.controller";

const router = Router();

router.get("/orders", getAllOrders as RequestHandler);
router.patch("/orders/:orderId/status", updateOrderStatus as RequestHandler);

export default router;
