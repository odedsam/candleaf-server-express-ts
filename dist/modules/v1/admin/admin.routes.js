"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get("/orders", admin_controller_1.getAllOrders);
router.patch("/orders/:orderId/status", admin_controller_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map