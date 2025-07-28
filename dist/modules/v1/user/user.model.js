"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const formatILTime = (date) => new Date(date).toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true,
    toJSON: {
        transform(_, obj) {
            if (obj.createdAt)
                obj.createdAtFormatted = formatILTime(obj.createdAt);
            if (obj.updatedAt)
                obj.updatedAtFormatted = formatILTime(obj.updatedAt);
            return obj;
        },
    },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map