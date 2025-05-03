import { Schema, model, Document, Types } from "mongoose";

export interface IWishlist extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const WishlistSchema = new Schema<IWishlist>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export default model<IWishlist>("Wishlist", WishlistSchema);