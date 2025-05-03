import { WishlistRepository } from "./wishlist.repo";

const wishlistRepo = new WishlistRepository();

export class WishlistService {
  async addProductToWishlist(userId: string, productId: string) {
    const exists = await wishlistRepo.isProductInWishlist(userId, productId);
    if (exists) throw new Error("Product already in wishlist");

    return await wishlistRepo.addToWishlist(userId, productId);
  }

  async removeProductFromWishlist(userId: string, productId: string) {
    return await wishlistRepo.removeFromWishlist(userId, productId);
  }

  async getUserWishlist(userId: string) {
    return await wishlistRepo.getUserWishlist(userId);
  }
}