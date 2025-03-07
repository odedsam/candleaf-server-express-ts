import { Router } from "express";
import { getCart, addItemToCart, removeItemFromCart, syncUserCart } from "../cart/cart.controller";
import { verifyToken } from "../../middleware/validate"

const router = Router();

router.get("/", verifyToken, (req, res) => void getCart(req as any, res));
router.post("/add", verifyToken, (req, res) => void addItemToCart(req as any, res));
router.delete("/remove", verifyToken, (req, res) => void removeItemFromCart(req as any, res));
router.post("/sync", verifyToken, (req, res) => void syncUserCart(req as any, res));

export default router;
