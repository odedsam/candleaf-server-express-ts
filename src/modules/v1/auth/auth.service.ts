import { AuthRepository } from "./auth.repo";
import { createResetToken, createToken, verifyResetToken, verifyToken } from "../../../utils/jwt";
import { fetchGoogleUser } from "../../../providers/google.provider";
import { UserRepository } from "../user/user.repo";
import { UserDocument } from "../../../types";
import { sendForgotPasswordEmail, sendResetPasswordConfirmationEmail } from "../../../providers/sendgrid.provider";
import bcrypt from "bcryptjs";

const authRepo = new AuthRepository();
const userRepo = new UserRepository();


export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = (await userRepo.create({ name, email })) as UserDocument;
    const fetchedUser = await userRepo.findById(user._id);
    await authRepo.create({
      user: user._id,
      provider: "local",
      password: hashedPassword,
    });

    return { user: fetchedUser, token: createToken(user._id.toString()) };
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
        user = await userRepo.create({
          name: googleUser.name,
          avatar: googleUser.avatar,
          email: googleUser.email,
          provider: "google",
        });
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
  async forgotPassword(email: string): Promise<void> {
    const user = await userRepo.findByEmail(email);
    if (!user) return;

    // const devUrl =`http://localhost:5173`;

    const token = createResetToken(user.id);
    const prodUrl=`https://candleaf-front.vercel.app`
    const resetLink = `${prodUrl}/auth/reset-password?token=${token}`;
    await sendForgotPasswordEmail(email, resetLink);
  }
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = await verifyResetToken(token);
      if (!decoded) throw new Error("Invalid or expired reset token");

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userRepo.update(decoded.userId, { password: hashedPassword });

      const user = await userRepo.findById(decoded.userId);
      if (user) {
        await sendResetPasswordConfirmationEmail(user.email);
      }
    } catch (err) {
      throw new Error("Invalid or expired reset token");
    }
  }
}
