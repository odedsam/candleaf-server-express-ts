"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUserCart = exports.removeItemFromCart = exports.addItemToCart = exports.getCart = void 0;
const cart_service_1 = require("./cart.service");
const getCart = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const cart = await (0, cart_service_1.getUserCart)(req.user.id);
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCart = getCart;
const addItemToCart = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { productId, quantity } = req.body;
        const cart = await (0, cart_service_1.addToCart)(req.user.id, productId, quantity);
        res.json(cart);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addItemToCart = addItemToCart;
const removeItemFromCart = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { productId } = req.body;
        const cart = await (0, cart_service_1.removeFromCart)(req.user.id, productId);
        res.json(cart);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.removeItemFromCart = removeItemFromCart;
const syncUserCart = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { localCart } = req.body;
        if (!Array.isArray(localCart)) {
            res.status(400).json({ message: "Invalid cart format" });
            return;
        }
        const cart = await (0, cart_service_1.syncCart)(req.user.id, localCart);
        res.json(cart);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.syncUserCart = syncUserCart;
//# sourceMappingURL=cart.controller.js.map