"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const wishlist_repo_1 = require("./wishlist.repo");
const wishlistRepo = new wishlist_repo_1.WishlistRepository();
class WishlistService {
    async addProductToWishlist(userId, productId) {
        const exists = await wishlistRepo.isProductInWishlist(userId, productId);
        if (exists)
            throw new Error("Product already in wishlist");
        return await wishlistRepo.addToWishlist(userId, productId);
    }
    async removeProductFromWishlist(userId, productId) {
        return await wishlistRepo.removeFromWishlist(userId, productId);
    }
    async getUserWishlist(userId) {
        return await wishlistRepo.getUserWishlist(userId);
    }
}
exports.WishlistService = WishlistService;
