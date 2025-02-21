import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const SignUpUser = mongoose.model("SignUpUser", signUpSchema);