import { Request, Response } from "express";
import { orderRepository } from "../order/order.repo";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderRepository.list();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to retrieve orders." });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid order status." });
  }

  try {
    const updatedOrder = await orderRepository.updateStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, message: "Order status updated.", order: updatedOrder });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ success: false, message: "Failed to update order status." });
  }
};
