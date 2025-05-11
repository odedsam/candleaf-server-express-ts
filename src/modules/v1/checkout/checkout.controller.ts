import { Request, Response } from "express";
import { generateOrderId } from "../../../utils/generateOrderId";
import { orderRepository } from "../order/order.repo";

export const checkoutController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { shipping, payment, cartItems } = req.body;

    if (!shipping || !payment || !cartItems?.cartItems?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid shipping, payment, or cart data.",
      });
    }

    const fullName = `${shipping.name} ${shipping.lastName}`;
    const order_id = generateOrderId();

    const newOrder = await orderRepository.create({
      order_id,
      email: shipping.email,
      name: fullName,
      city: shipping.city,
      country: shipping.country,
      postal_code: shipping.postalCode,
      shipping_note: shipping.address,
      shipping_method: payment.shippingMethod,
      products: cartItems.cartItems,
      sub_total: cartItems.subTotal,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order successfully placed.",
      order: {
        order_id: newOrder.order_id,
        name: newOrder.name,
        email: newOrder.email,
        status: newOrder.status,
        products: newOrder.products,
        sub_total: newOrder.sub_total,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postalCode,
        shipping_note: shipping.address,
        shipping_method: payment.shippingMethod,
      },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while processing order.",
    });
  }
};
