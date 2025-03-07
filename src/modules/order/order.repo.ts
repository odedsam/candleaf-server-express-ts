import OrderModel, { IOrder } from "./order.model";

export class OrderRepository {
  async create(orderData: Partial<IOrder>) {
    return await OrderModel.create(orderData);
  }

  async findById(orderId: string) {
    return await OrderModel.findById(orderId).populate("products.productId");
  }

  async findByUser(userId: string) {
    return await OrderModel.find({ userId }).populate("products.productId");
  }

  async updateStatus(orderId: string, status: string) {
    return await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  }

  async delete(orderId: string) {
    return await OrderModel.findByIdAndDelete(orderId);
  }
}