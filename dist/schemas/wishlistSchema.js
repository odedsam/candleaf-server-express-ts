"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistSchema = void 0;
const zod_1 = require("zod");
exports.wishlistSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
//# sourceMappingURL=wishlistSchema.js.map