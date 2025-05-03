import { Types } from "mongoose";
import { AuthModel,IAuth } from "./auth.model";

export class AuthRepository {
  async create(authData: Omit<IAuth, 'user'> & { user: Types.ObjectId }) {
    return await AuthModel.create(authData);
  }

  async findByUserId(userId: string | Types.ObjectId) {
    return await AuthModel.findOne({ user: userId });
  }

  async findByProviderId(providerId: string) {
    return await AuthModel.findOne({ providerId });
  }

  async findByResetToken(resetToken: string) {
    return await AuthModel.findOne({ resetToken });
  }

  async updateResetToken(userId: string | Types.ObjectId, resetToken: string, resetTokenExp: Date) {
    return await AuthModel.findOneAndUpdate({ user: userId }, { resetToken, resetTokenExp });
  }

  async verifyEmail(userId: string | Types.ObjectId) {
    return await AuthModel.findOneAndUpdate({ user: userId }, { email_verified_at: new Date().toISOString() });
  }

}
