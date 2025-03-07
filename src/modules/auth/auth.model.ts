import { Schema, model, Document } from "mongoose";

export interface IAuth extends Document {
  user: Schema.Types.ObjectId;
  provider: "local" | "google";
  passwordHash?: string;
  providerId?: string; 
}

const AuthSchema = new Schema<IAuth>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: String, enum: ["local", "google"], required: true },
    passwordHash: { type: String }, 
    providerId: { type: String },
  },
  { timestamps: true }
);

export default model<IAuth>("Auth", AuthSchema);