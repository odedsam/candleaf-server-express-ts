"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const wishlist_service_1 = require("./wishlist.service");
const wishlistService = new wishlist_service_1.WishlistService();
class WishlistController {
    static async addToWishlist(req, res) {
        try {
            const { userId, productId } = req.body;
            const wishlistItem = await wishlistService.addProductToWishlist(userId, productId);
            res.status(201).json(wishlistItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async removeFromWishlist(req, res) {
        try {
            const { userId, productId } = req.body;
            await wishlistService.removeProductFromWishlist(userId, productId);
            res.json({ message: "Product removed from wishlist" });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getUserWishlist(req, res) {
        try {
            const wishlist = await wishlistService.getUserWishlist(req.params.userId);
            res.json(wishlist);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map