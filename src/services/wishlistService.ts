import WishlistModel from "../models/Wishlist";

export const getUserWishlist = async (userId: string) => {
  return await WishlistModel.findOne({ userId }).populate("items.product");
};

export const addToWishlist = async (userId: string, productId: string) => {
  let wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    wishlist = await WishlistModel.create({ userId, items: [] });
  }

  const alreadyExists = wishlist.items.some((item) => item.product.toString() === productId);
  if (!alreadyExists) {
    wishlist.items.push({ product: productId });
    await wishlist.save();
  }

  return wishlist;
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const wishlist = await WishlistModel.findOne({ userId });
  if (!wishlist) throw new Error("Wishlist not found");

  wishlist.items.set(wishlist.items.filter((item) => item.product.toString() !== productId));

  await wishlist.save();
  return wishlist;
};
