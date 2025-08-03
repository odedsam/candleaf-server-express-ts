"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = {};
        result.error.issues.forEach((issue) => {
            const field = issue.path.join('.');
            if (!errors[field]) {
                errors[field] = [];
            }
            errors[field].push(issue.message);
        });
        res.status(400).json({
            message: "Validation failed",
            errors: errors,
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map