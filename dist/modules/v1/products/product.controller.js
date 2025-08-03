"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    static async create(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getAll(_req, res) {
        const products = await productService.getAllProducts();
        res.json(products);
    }
    static async getById(req, res) {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    }
    static async update(req, res) {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    }
    static async delete(req, res) {
        await productService.deleteProduct(req.params.id);
        res.json({ message: "Product deleted" });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map