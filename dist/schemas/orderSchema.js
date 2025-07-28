"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    })),
    totalPrice: zod_1.z.number().min(0, "Total price must be positive"),
    status: zod_1.z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
});
//# sourceMappingURL=orderSchema.js.map