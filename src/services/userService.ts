import UserModel from "../models/User";

export const getUserById = async (userId: string) => {
  return await UserModel.findById(userId).select("-password");
};

export const updateUserById = async (userId: string, updates: Partial<{ name: string; email: string }>) => {
  return await UserModel.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");
};
