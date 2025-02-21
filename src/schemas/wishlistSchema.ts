import { z } from "zod";

export const wishlistSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});
