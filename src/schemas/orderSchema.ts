
import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
  totalPrice: z.number().min(0, "Total price must be positive"),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
});