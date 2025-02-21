import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    // Password-based authentication
    password: { type: String },

    // OAuth authentication (Optional fields)
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },

    // Store OAuth access/refresh tokens
    googleAccessToken: { type: String },
    googleRefreshToken: { type: String },
    googleAccessTokenExpiresAt: { type: String },

    // User Orders
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
