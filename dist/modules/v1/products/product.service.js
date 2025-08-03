"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repo_1 = require("./product.repo");
const productRepo = new product_repo_1.ProductRepository();
class ProductService {
    async createProduct(productData) {
        return await productRepo.create(productData);
    }
    async getProductById(productId) {
        return await productRepo.findById(productId);
    }
    async getAllProducts() {
        return await productRepo.findAll();
    }
    async updateProduct(productId, updateData) {
        return await productRepo.update(productId, updateData);
    }
    async deleteProduct(productId) {
        return await productRepo.delete(productId);
    }
}
exports.ProductService = ProductService;
