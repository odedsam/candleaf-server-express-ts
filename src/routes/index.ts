import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/order/order.routes";
import productRoutes from "../modules/products/product.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;