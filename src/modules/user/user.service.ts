import { UserRepository } from "./user.repo";
import { IUser } from "./user.model";
const userRepo = new UserRepository();

export class UserService {
  async getUserProfile(userId: string) {
    return await userRepo.findById(userId);
  }

  async updateUser(userId: string, updateData: Partial<IUser>) {
    return await userRepo.update(userId, updateData);
  }

  async deleteUser(userId: string) {
    return await userRepo.delete(userId);
  }
}