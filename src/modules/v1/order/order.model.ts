// import { Schema, model, Document, Types } from "mongoose";

// export interface IOrder extends Document {
//   userId: typeof Types.ObjectId; 
//   products: { productId: Types.ObjectId; quantity: number }[];
//   totalPrice: number;
//   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
// }

// const OrderSchema = new Schema<IOrder>(
//   {
//     userId: { type: Types.ObjectId, ref: "User", required: true }, 
//     products: [
//       {
//         productId: { type: Types.ObjectId, ref: "Product", required: true }, 
//         quantity: { type: Number, required: true, min: 1 },
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default model<IOrder>("Order", OrderSchema);