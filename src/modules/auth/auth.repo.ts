import AuthModel, { IAuth } from "./auth.model";

export class AuthRepository {
  async create(authData: Partial<IAuth>) {
    return await AuthModel.create(authData);
  }

  async findByUserId(userId: string) {
    return await AuthModel.findOne({ user: userId });
  }

  async findByProviderId(providerId: string) {
    return await AuthModel.findOne({ providerId });
  }
}