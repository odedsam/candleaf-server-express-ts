import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { validate } from "../../middleware/validate";
import { wishlistSchema } from "../../schemas/wishlistSchema";

const router = Router();

router.post("/add", validate(wishlistSchema), WishlistController.addToWishlist);
router.post("/remove", validate(wishlistSchema), WishlistController.removeFromWishlist);
router.get("/:userId", WishlistController.getUserWishlist);

export default router;