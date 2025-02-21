import { Router } from "express";
import { getWishlist, addItemToWishlist, removeItemFromWishlist } from "../controllers/wishlistController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { wishlistSchema } from "../schemas/wishlistSchema";

const router = Router();

router.get("/", verifyToken, getWishlist);
router.post("/add", verifyToken, validate(wishlistSchema), addItemToWishlist);
router.delete("/remove", verifyToken, validate(wishlistSchema), removeItemFromWishlist);

export default router;
