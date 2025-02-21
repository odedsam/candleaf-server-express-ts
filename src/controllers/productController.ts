import { Request, Response } from "express";
import { getAllProducts, getProductById } from "../services/productService";
//@ts-ignore
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
