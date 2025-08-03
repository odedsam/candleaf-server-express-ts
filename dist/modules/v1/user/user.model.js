"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const formatILTime = (date) => new Date(date).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, toLowerCase: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, {
    timestamps: true,
    toJSON: {
        transform(_, doc) {
            if (doc.createdAt)
                doc.createdAt = formatILTime(doc.createdAt);
            if (doc.updatedAt)
                doc.updatedAt = formatILTime(doc.updatedAt);
            return doc;
        },
    },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
