import mongoose, { Schema, Document, Types } from "mongoose";

interface CartItem {
  product: Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  userId: Types.ObjectId;
  items: mongoose.Types.DocumentArray<CartItem>;
}

const CartSchema = new Schema<Cart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export default mongoose.model<Cart>("Cart", CartSchema);
