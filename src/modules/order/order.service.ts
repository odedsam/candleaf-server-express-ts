// import { OrderRepository } from "./order.repo";
// import { IOrder } from "./order.model";

// const orderRepo = new OrderRepository();

// export class OrderService {
//   async createOrder(userId: string, products: { productId: string; quantity: number }[], totalPrice: number) {
//     return await orderRepo.create({ userId, products, totalPrice, status: "pending" });
//   }

//   async getOrderById(orderId: string) {
//     return await orderRepo.findById(orderId);
//   }

//   async getUserOrders(userId: string) {
//     return await orderRepo.findByUser(userId);
//   }

//   async updateOrderStatus(orderId: string, status: "pending" | "processing" | "shipped" | "delivered" | "cancelled") {
//     return await orderRepo.updateStatus(orderId, status);
//   }

//   async deleteOrder(orderId: string) {
//     return await orderRepo.delete(orderId);
//   }
// }