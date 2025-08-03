"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextOrderNumber = getNextOrderNumber;
const counter_model_1 = require("../modules/v1/order/counter.model");
async function getNextOrderNumber() {
    const counter = await counter_model_1.Counter.findOneAndUpdate({ name: "orders" }, { $inc: { value: 1 } }, { new: true, upsert: true });
    return `ORD-${new Date().getFullYear()}-${String(counter.value).padStart(5, "0")}`;
}
//# sourceMappingURL=getNextOrderNumber.js.map