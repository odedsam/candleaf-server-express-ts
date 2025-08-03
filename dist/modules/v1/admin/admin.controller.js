"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = void 0;
const order_repo_1 = require("../order/order.repo");
const getAllOrders = async (_req, res) => {
    try {
        const orders = await order_repo_1.orderRepository.list();
        res.status(200).json({ success: true, orders });
    }
    catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "Failed to retrieve orders." });
    }
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid order status." });
    }
    try {
        const updatedOrder = await order_repo_1.orderRepository.updateStatus(orderId, status);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }
        res.status(200).json({ success: true, message: "Order status updated.", order: updatedOrder });
    }
    catch (err) {
        console.error("Error updating status:", err);
        res.status(500).json({ success: false, message: "Failed to update order status." });
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=admin.controller.js.map