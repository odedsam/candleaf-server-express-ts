"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorError = exports.colorSuccess = void 0;
const colorSuccess = (message) => {
    console.log(`\x1b[32m%s\x1b[0m`, `SUCCESS: ${message}`);
};
exports.colorSuccess = colorSuccess;
const colorError = (message) => {
    console.error(`\x1b[31m%s\x1b[0m`, `ERROR: ${message}`);
};
exports.colorError = colorError;
//# sourceMappingURL=index.js.map