// import { Router } from "express";
// import { getCart, addItemToCart, removeItemFromCart, syncUserCart } from "./cart.controller";
// import { verifyToken } from "../../middleware/authMiddleware"; // ✅ ודא שזה הנתיב הנכון
// import { validate } from "middleware/validate";

// const router = Router();

// router.get("/", validate(verifyToken), getCart);
// router.post("/add", validate(verifyToken), addItemToCart);
// router.delete("/remove", validate(verifyToken), removeItemFromCart);
// router.post("/sync", validate(verifyToken), syncUserCart);

// export default router;