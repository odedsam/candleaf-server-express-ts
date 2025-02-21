import ProductModel from "../models/Product";

export const getAllProducts = async () => {
  return await ProductModel.find();
};

export const getProductById = async (productId: string) => {
  return await ProductModel.findById(productId);
};
