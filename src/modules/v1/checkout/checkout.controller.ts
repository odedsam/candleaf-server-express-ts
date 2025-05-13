import { Request, Response } from "express";
import { generateOrderId } from "../../../utils/generate";
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

     const products = cartItems.cartItems.map((item: any) => ({
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.price * item.quantity,
    }));


    const newOrder = await orderRepository.create({
      order_id: generateOrderId(),
      email: shipping.email,
      name: fullName,
      city: shipping.city,
      country: shipping.country,
      postal_code: shipping.postalCode,
      shipping_note: shipping.address,
      shipping_method: payment.shippingMethod,
      products,
      sub_total: cartItems.subTotal,
      status: 'pending',
    });

    console.log(newOrder);

    return res.status(201).json({
      success: true,
      message: "Order successfully placed.",
      userConfirmation:newOrder,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while processing order.",
    });
  }
};
