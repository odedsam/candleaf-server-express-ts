import {Schema,model,Document} from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    image:string;
    category: string;
  }
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
