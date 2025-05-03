import bcrypt from "bcryptjs";
import { AuthRepository } from "./auth.repo";
import { createToken, verifyToken } from "../../../utils/jwt";
import { fetchGoogleUser } from "../../../providers/google.provider";
import { UserRepository } from "../user/user.repo";


const authRepo = new AuthRepository();
const userRepo = new UserRepository();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.create({ name, email });

    await authRepo.create({
      user: user._id,
      provider: "local",
      password: hashedPassword,
    });

    return { user, token: createToken(user._id.toString()) };
  }

  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const auth = await authRepo.findByUserId(user._id);
    if (!auth || !auth.password) {
      throw new Error("Invalid login method");
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return { user, token: createToken(user._id.toString()) };
  }
  async loginWithGoogle(accessToken: string) {
    const googleUser = await fetchGoogleUser(accessToken);

    if (!googleUser?.id || !googleUser?.email) {
      throw new Error("Invalid Google user data");
    }

    let auth = await authRepo.findByProviderId(googleUser.id);
    let user;

    if (!auth) {
      user = await userRepo.findByEmail(googleUser.email);
      if (!user) {
        user = await userRepo.create({ name: googleUser.name, avatar: googleUser.avatar, email: googleUser.email, provider: 'google' });
      }
      await authRepo.create({
        user: user._id,
        provider: "google",
        providerId: googleUser.id,
      });
    } else {
      user = await userRepo.findById(auth.user.toString());
      if (!user) {
        throw new Error("Linked user not found for Google account");
      }
    }

    return { user, token: createToken(user._id.toString()) };
  }

  async logout(userId?: string | any) {
    console.log(`User ${userId} logged out (client-side token deletion).`);
    return { message: "Logged out successfully" };
  }

  async verifyToken(token: string) {
    try {
      const decoded = await verifyToken(token);
      if (!decoded?.userId) {
        return null;
      }
      const user = await userRepo.findById(decoded.userId);
      return user;
    } catch (error) {
      return null;
    }
  }

  //whats next
  // - forgot password
  // - reset password
  // - email verification
}
