import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import { generateTokens } from "../utils/jwt";

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ name, email, password: hashedPassword });

  return generateTokens(user._id.toString());
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateTokens(user._id.toString());
};
