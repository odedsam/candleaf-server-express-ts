import { Request, Response } from "express";
import { UserService } from "./user.service";
import { orderRepository } from "../order/order.repo";

const userService = new UserService();

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const user = await userService.getUserProfile(req.params.id);
      const userOrdersHistory = await orderRepository.findUserHistoryOrders(req.params.id);

      res.json({ userOrdersHistory, user });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
