import { Response, Request } from "express";
import { getUserCart, addToCart, removeFromCart, syncCart } from "../cart/cart.service";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role?: string };
}

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const cart = await getUserCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addItemToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId, quantity } = req.body;
    const cart = await addToCart(req.user.id, productId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const removeItemFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId } = req.body;
    const cart = await removeFromCart(req.user.id, productId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const syncUserCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { localCart } = req.body;
    if (!Array.isArray(localCart)) {
      res.status(400).json({ message: "Invalid cart format" });
      return;
    }

    const cart = await syncCart(req.user.id, localCart);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
