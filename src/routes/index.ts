import { Router } from "express";
import authRoutesV1 from "../modules/v1/auth/auth.routes";
import healthRouteV1 from "./health";
// import userRoutes from "../modules/user/user.routes";
// import cartRoutes from "../modules/cart/cart.routes";
// import orderRoutes from "../modules/order/order.routes";
// import productRoutes from "../modules/products/product.routes";
// import wishlistRoutes from "../modules/wishlist/wishlist.routes";

const router = Router();



router.use("/v1/auth", authRoutesV1);
router.use("/v1/health", healthRouteV1);


// router.use("/user", userRoutes);
// router.use("/users", userRoutes);ac
// router.use("/cart", cartRoutes);
// router.use("/orders", orderRoutes);
// router.use("/products", productRoutes);
// router.use("/wishlist", wishlistRoutes);

export default router;

// new routes/auth.routes.ts :
// import { Router } from 'express'
// import { loginWithGoogle, verifyToken, logout, loginWithPassword, registerWithPassword } from '../controllers/auth.controller'

// const router = Router()

// router.post('/auth/google', loginWithGoogle)
// router.post('/auth/verify', verifyToken)
// router.post('/auth/logout', logout)

// router.post('/auth/register', registerWithPassword)
// router.post('/auth/login', loginWithPassword)

// export default router
