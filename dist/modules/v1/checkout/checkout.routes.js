"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_controller_1 = require("./checkout.controller");
const router = (0, express_1.Router)();
router.post('/', checkout_controller_1.checkoutController);
exports.default = router;
//# sourceMappingURL=checkout.routes.js.map