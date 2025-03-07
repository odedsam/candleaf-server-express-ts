import bcrypt from "bcryptjs";
import { AuthRepository } from "./auth.repo";
import { UserRepository } from "../user/user.repo";
import { generateTokens } from "../../utils/jwt";

const authRepo = new AuthRepository();
const userRepo = new UserRepository();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.create({ name, email });

    await authRepo.create({
      user: user.id,
      provider: "local",
      passwordHash: hashedPassword,
    });

    return { user, ...generateTokens(user.id) };
  }

  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const auth = await authRepo.findByUserId(user.id);
    if (!auth || !auth.passwordHash) throw new Error("Invalid login method");

    const isMatch = await bcrypt.compare(password, auth.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");

    return { user, ...generateTokens(user.id) };
  }
}