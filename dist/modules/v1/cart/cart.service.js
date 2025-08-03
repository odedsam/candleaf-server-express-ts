"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCart = exports.removeFromCart = exports.addToCart = exports.getUserCart = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
const getUserCart = async (userId) => {
    let cart = await cart_model_1.default.findOne({ userId }).populate("items.product");
    if (!cart) {
        cart = await cart_model_1.default.create({ userId, items: [] });
    }
    return cart;
};
exports.getUserCart = getUserCart;
const addToCart = async (userId, productId, quantity) => {
    let cart = await cart_model_1.default.findOne({ userId });
    if (!cart) {
        cart = await cart_model_1.default.create({ userId, items: [] });
    }
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    return cart;
};
exports.addToCart = addToCart;
const removeFromCart = async (userId, productId) => {
    const cart = await cart_model_1.default.findOne({ userId });
    if (!cart)
        throw new Error("Cart not found");
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    return cart;
};
exports.removeFromCart = removeFromCart;
const syncCart = async (userId, localCart) => {
    let cart = await cart_model_1.default.findOne({ userId });
    if (!cart) {
        cart = await cart_model_1.default.create({ userId, items: [] });
    }
    for (const item of localCart) {
        const existingItem = cart.items.find((i) => i.product.toString() === item.product);
        if (existingItem) {
            existingItem.quantity = item.quantity;
        }
        else {
            cart.items.push({ product: item.product, quantity: item.quantity });
        }
    }
    await cart.save();
    return cart;
};
exports.syncCart = syncCart;
