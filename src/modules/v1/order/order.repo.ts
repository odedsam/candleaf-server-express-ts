import Order, { OrderDocument } from "./order.model";

export class OrderRepository {
  async create(orderData: Partial<OrderDocument>): Promise<OrderDocument> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findByOrderId(order_id: string): Promise<OrderDocument | null> {
    return await Order.findOne({ order_id });
  }

  async updateStatus(order_id: string, status: OrderDocument["status"]): Promise<OrderDocument | null> {
    return await Order.findOneAndUpdate({ order_id }, { status }, { new: true });
  }

  async list(): Promise<OrderDocument[]> {
    return await Order.find().sort({ createdAt: -1 });
  }
  async findUserHistoryOrders(userId?: string, guestEmail?: string) {
    if (userId) {
      return await Order.find({ user: userId }).populate("user", "name email").sort({ createdAt: -1 });
    }
    if (guestEmail) {
      return await Order.find({ guestEmail }).sort({ createdAt: -1 });
    }
    return [];
  }

  async delete(order_id: string): Promise<void> {
    await Order.deleteOne({ order_id });
  }
}

export const orderRepository = new OrderRepository();
