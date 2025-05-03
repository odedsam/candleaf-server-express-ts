import CartModel from "./cart.model";

export const getUserCart = async (userId: string) => {
  let cart = await CartModel.findOne({ userId }).populate("items.product");

  if (!cart) {
    cart = await CartModel.create({ userId, items: [] });
  }

  return cart;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    cart = await CartModel.create({ userId, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity } as any); // ✅ Fix: Explicit cast
  }

  await cart.save();
  return cart;
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await CartModel.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((item) => item.product.toString() !== productId) as any; // ✅ Fix: Explicit cast

  await cart.save();
  return cart;
};

export const syncCart = async (userId: string, localCart: { product: string; quantity: number }[]) => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    cart = await CartModel.create({ userId, items: [] });
  }

  for (const item of localCart) {
    const existingItem = cart.items.find((i) => i.product.toString() === item.product);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else {
      cart.items.push({ product: item.product, quantity: item.quantity } as any);
    }
  }

  await cart.save();
  return cart;
};
