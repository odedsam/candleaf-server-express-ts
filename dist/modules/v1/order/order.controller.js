"use strict";
// import { Request, Response } from "express";
// import { OrderService } from "./order.service";
// const orderService = new OrderService();
// export class OrderController {
//   static async create(req: Request, res: Response) {
//     try {
//       const { userId, products, totalPrice } = req.body;
//       const order = await orderService.createOrder(userId, products, totalPrice);
//       res.status(201).json(order);
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
//   static async getById(req: Request, res: Response) {
//     try {
//       const order = await orderService.getOrderById(req.params.id);
//       res.json(order);
//     } catch (error:any) {
//       res.status(404).json({ message: error.message });
//     }
//   }
//   static async getUserOrders(req: Request, res: Response) {
//     try {
//       const orders = await orderService.getUserOrders(req.params.userId);
//       res.json(orders);
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
//   static async updateStatus(req: Request, res: Response) {
//     try {
//       const { status } = req.body;
//       const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
//       res.json(updatedOrder);
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
//   static async delete(req: Request, res: Response) {
//     try {
//       await orderService.deleteOrder(req.params.id);
//       res.json({ message: "Order deleted" });
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }
// }
//# sourceMappingURL=order.controller.js.map