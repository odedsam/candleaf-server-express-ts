"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    provider: { type: String, enum: ["google", "local"], required: true },
    providerId: { type: String, default: null },
    password: { type: String },
    email_verified_at: { type: String, default: null },
    resetToken: { type: String, default: null },
    resetTokenExp: { type: Date, default: null },
}, {
    timestamps: true,
    toJSON: {
        transform(_, doc) {
            return doc;
        },
    },
});
exports.AuthModel = (0, mongoose_1.model)("Auth", authSchema);
