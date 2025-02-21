import { Request, Response } from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "../services/wishlistService";

export const getWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.user.id;
    const wishlist = await getUserWishlist(userId);
    res.json(wishlist);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const addItemToWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    const userId = req.body.user.id;
    const wishlist = await addToWishlist(userId, productId);
    res.json(wishlist);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const removeItemFromWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    const userId = req.body.user.id;
    const wishlist = await removeFromWishlist(userId, productId);
    res.json(wishlist);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
