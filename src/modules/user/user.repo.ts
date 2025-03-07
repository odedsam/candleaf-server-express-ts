import UserModel, { IUser } from "./user.model";

export class UserRepository {
  async create(userData: Partial<IUser>) {
    return await UserModel.create(userData);
  }

  async findById(userId: string) {
    return await UserModel.findById(userId);
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async update(userId: string, updateData: Partial<IUser>) {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async delete(userId: string) {
    return await UserModel.findByIdAndDelete(userId);
  }
}