"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = void 0;
exports.generateOrderId = generateOrderId;
const crypto_1 = require("crypto");
function generateOrderId() {
    const random = (0, crypto_1.randomBytes)(4).toString('hex');
    const base36 = parseInt(random, 16).toString(36).toUpperCase().slice(0, 6);
    return `ORD-${base36}`;
}
const generateResetToken = () => {
    return (0, crypto_1.randomBytes)(20).toString('hex');
};
exports.generateResetToken = generateResetToken;
//# sourceMappingURL=generate.js.map