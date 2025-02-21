import OrderModel from "../models/Order";

export const getUserOrders = async (userId: string) => {
  return await OrderModel.find({ userId }).populate("items.product");
};
