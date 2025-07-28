"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().min(1, "Product description is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    stock: zod_1.z.number().min(0, "Stock must be a positive number"),
    image: zod_1.z.string().url("Image must be a valid URL").optional(),
    category: zod_1.z.string().min(1, "Category is required"),
});
//# sourceMappingURL=productSchema.js.map