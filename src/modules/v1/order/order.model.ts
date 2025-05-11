import mongoose, { Schema, Document } from "mongoose";

interface ProductItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface OrderDocument extends Document {
  order_id: string;
  email: string;
  name: string;
  city: string;
  country: string;
  postal_code: string;
  shipping_note: string;
  shipping_method: string;
  products: ProductItem[];
  sub_total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ProductItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema<OrderDocument>(
  {
    order_id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },
    shipping_note: { type: String, required: true },
    shipping_method: { type: String, required: true },
    products: { type: [ProductItemSchema], required: true },
    sub_total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<OrderDocument>("Order", OrderSchema);
