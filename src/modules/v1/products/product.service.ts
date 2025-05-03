import { ProductRepository } from "./product.repo";
import { IProduct } from "./product.model";

const productRepo = new ProductRepository();

export class ProductService {
  async createProduct(productData: IProduct) {
    return await productRepo.create(productData);
  }

  async getProductById(productId: string) {
    return await productRepo.findById(productId);
  }

  async getAllProducts() {
    return await productRepo.findAll();
  }

  async updateProduct(productId: string, updateData: Partial<IProduct>) {
    return await productRepo.update(productId, updateData);
  }

  async deleteProduct(productId: string) {
    return await productRepo.delete(productId);
  }
}