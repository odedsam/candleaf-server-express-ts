import { Request, Response } from "express";
import UserModel from "../models/User";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.user.id;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.body.user.id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
