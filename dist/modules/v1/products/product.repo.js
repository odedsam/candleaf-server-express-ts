"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_model_1 = __importDefault(require("./product.model"));
class ProductRepository {
    async create(productData) {
        return await product_model_1.default.create(productData);
    }
    async findById(productId) {
        return await product_model_1.default.findById(productId);
    }
    async findAll() {
        return await product_model_1.default.find();
    }
    async update(productId, updateData) {
        return await product_model_1.default.findByIdAndUpdate(productId, updateData, { new: true });
    }
    async delete(productId) {
        return await product_model_1.default.findByIdAndDelete(productId);
    }
}
exports.ProductRepository = ProductRepository;
