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
    return await Order.findOneAndUpdate(
      { order_id },
      { status },
      { new: true }
    );
  }

  async list(): Promise<OrderDocument[]> {
    return await Order.find().sort({ createdAt: -1 });
  }

  async delete(order_id: string): Promise<void> {
    await Order.deleteOne({ order_id });
  }
}

export const orderRepository = new OrderRepository();
