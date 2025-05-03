import { Request, Response } from "express";
import { ProductService } from "./product.service";

const productService = new ProductService();

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(_req: Request, res: Response) {
    const products = await productService.getAllProducts();
    res.json(products);
  }

  static async getById(req: Request, res: Response) {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  }

  static async update(req: Request, res: Response) {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  }

  static async delete(req: Request, res: Response) {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  }
}