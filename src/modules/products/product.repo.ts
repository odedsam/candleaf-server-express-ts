import ProductModel, { IProduct } from "./product.model";

export class ProductRepository {
  async create(productData: IProduct) {
    return await ProductModel.create(productData);
  }

  async findById(productId: string) {
    return await ProductModel.findById(productId);
  }

  async findAll() {
    return await ProductModel.find();
  }

  async update(productId: string, updateData: Partial<IProduct>) {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
  }

  async delete(productId: string) {
    return await ProductModel.findByIdAndDelete(productId);
  }
}