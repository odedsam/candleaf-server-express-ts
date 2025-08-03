"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String },
    category: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
//# sourceMappingURL=product.model.js.map