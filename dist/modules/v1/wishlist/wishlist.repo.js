"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepository = void 0;
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
class WishlistRepository {
    async addToWishlist(userId, productId) {
        return await wishlist_model_1.default.create({ userId, productId });
    }
    async removeFromWishlist(userId, productId) {
        return await wishlist_model_1.default.findOneAndDelete({ userId, productId });
    }
    async getUserWishlist(userId) {
        return await wishlist_model_1.default.find({ userId }).populate("productId");
    }
    async isProductInWishlist(userId, productId) {
        return await wishlist_model_1.default.exists({ userId, productId });
    }
}
exports.WishlistRepository = WishlistRepository;
//# sourceMappingURL=wishlist.repo.js.map