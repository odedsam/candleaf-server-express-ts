import { AuthRepository } from "./auth.repo";
import { UserRepository } from "../user/user.repo";
import { generateTokens } from "../../utils/jwt";

const authRepo = new AuthRepository();
const userRepo = new UserRepository();

export class GoogleAuthService {
  async findOrCreateGoogleUser(name: string, email: string, googleId: string) {
    let user = await userRepo.findByEmail(email);

    if (!user) {
      user = await userRepo.create({ name, email });
    }

    let auth = await authRepo.findByUserId(user.id);
    if (!auth) {
      auth = await authRepo.create({ user: user.id, provider: "google", providerId: googleId });
    }

    return { user, ...generateTokens(user.id) };
  }
}