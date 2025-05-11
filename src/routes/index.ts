import { Router } from "express";
import { requireAdmin } from "../middleware/authGuard";
import authRoutesV1 from "../modules/v1/auth/auth.routes";
import healthRouteV1 from "./health";
import publicRouteV1 from "../modules/v1/public/public.routes";
import checkoutRouteV1 from "../modules/v1/checkout/checkout.routes";
import adminRoutes from "../modules/v1/admin/admin.routes";

const router = Router();

router.use("/v1/auth", authRoutesV1);
router.use("/v1/health", healthRouteV1);
router.use("/v1", publicRouteV1);
router.use("/v1/checkout", checkoutRouteV1);

router.use("/protected/admin", requireAdmin as any, adminRoutes);

export default router;
