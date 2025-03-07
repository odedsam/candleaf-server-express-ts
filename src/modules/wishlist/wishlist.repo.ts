import WishlistModel, { IWishlist } from "./wishlist.model";

export class WishlistRepository {
  async addToWishlist(userId: string, productId: string) {
    return await WishlistModel.create({ userId, productId });
  }

  async removeFromWishlist(userId: string, productId: string) {
    return await WishlistModel.findOneAndDelete({ userId, productId });
  }

  async getUserWishlist(userId: string) {
    return await WishlistModel.find({ userId }).populate("productId");
  }

  async isProductInWishlist(userId: string, productId: string) {
    return await WishlistModel.exists({ userId, productId });
  }
}