"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = exports.OrderRepository = void 0;
const order_model_1 = __importDefault(require("./order.model"));
class OrderRepository {
    async create(orderData) {
        const order = new order_model_1.default(orderData);
        return await order.save();
    }
    async findByOrderId(order_id) {
        return await order_model_1.default.findOne({ order_id });
    }
    async updateStatus(order_id, status) {
        return await order_model_1.default.findOneAndUpdate({ order_id }, { status }, { new: true });
    }
    async list() {
        return await order_model_1.default.find().sort({ createdAt: -1 });
    }
    async findUserHistoryOrders(userId, guestEmail) {
        if (userId) {
            return await order_model_1.default.find({ user: userId }).populate("user", "name email").sort({ createdAt: -1 });
        }
        if (guestEmail) {
            return await order_model_1.default.find({ guestEmail }).sort({ createdAt: -1 });
        }
        return [];
    }
    async delete(order_id) {
        await order_model_1.default.deleteOne({ order_id });
    }
}
exports.OrderRepository = OrderRepository;
exports.orderRepository = new OrderRepository();
//# sourceMappingURL=order.repo.js.map