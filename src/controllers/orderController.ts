import { Request, Response } from "express";
import { getUserOrders } from "../services/orderService";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.user.id;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
