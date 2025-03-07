import { Request, Response } from "express";
import { WishlistService } from "./wishlist.service";

const wishlistService = new WishlistService();

export class WishlistController {
  static async addToWishlist(req: Request, res: Response) {
    try {
      const { userId, productId } = req.body;
      const wishlistItem = await wishlistService.addProductToWishlist(userId, productId);
      res.status(201).json(wishlistItem);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async removeFromWishlist(req: Request, res: Response) {
    try {
      const { userId, productId } = req.body;
      await wishlistService.removeProductFromWishlist(userId, productId);
      res.json({ message: "Product removed from wishlist" });
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserWishlist(req: Request, res: Response) {
    try {
      const wishlist = await wishlistService.getUserWishlist(req.params.userId);
      res.json(wishlist);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }
}