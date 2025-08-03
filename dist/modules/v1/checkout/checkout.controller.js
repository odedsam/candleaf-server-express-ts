"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const generate_1 = require("../../../utils/generate");
const order_repo_1 = require("../order/order.repo");
const getNextOrderNumber_1 = require("../../../utils/getNextOrderNumber");
const checkoutController = async (req, res) => {
    try {
        const { shipping, payment, cartItems, userId, isGuest } = req.body;
        if (!shipping || !payment || !cartItems?.cartItems?.length) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid shipping, payment, or cart data.",
            });
        }
        const fullName = `${shipping.name} ${shipping.lastName}`;
        const products = cartItems.cartItems.map((item) => ({
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            subTotal: item.price * item.quantity,
        }));
        const generateOrderNumber = await (0, getNextOrderNumber_1.getNextOrderNumber)();
        const newOrder = await order_repo_1.orderRepository.create({
            order_id: (0, generate_1.generateOrderId)(),
            orderNumber: generateOrderNumber,
            user: userId,
            email: shipping.email,
            name: fullName,
            city: shipping.city,
            country: shipping.country,
            postal_code: shipping.postalCode,
            shipping_note: shipping.address,
            shipping_method: payment.shippingMethod,
            isGuest,
            products,
            sub_total: cartItems.subTotal,
            status: "pending",
        });
        console.log(newOrder);
        return res.status(201).json({
            success: true,
            message: "Order successfully placed.",
            userConfirmation: newOrder,
        });
    }
    catch (err) {
        console.error("Checkout error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error while processing order.",
        });
    }
};
exports.checkoutController = checkoutController;
