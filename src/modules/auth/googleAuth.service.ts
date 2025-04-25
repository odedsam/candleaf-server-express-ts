import { OAuth2Client } from "google-auth-library";
import { AuthRepository } from "./auth.repo";
import { UserRepository } from "../user/user.repo";
import { generateTokens } from "../../utils/jwt";

const authRepo = new AuthRepository();
const userRepo = new UserRepository();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class GoogleAuthService {
  async authenticateGoogleUser(credential: string) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google token");

    let user = await userRepo.findByEmail(payload.email!);
    if (!user) {
      user = await userRepo.create({ name: payload.name!, email: payload.email! });
    }

    let auth = await authRepo.findByUserId(user.id);
    if (!auth) {
      auth = await authRepo.create({ user: user.id, provider: "google", providerId: payload.sub });
    }

    return { user, ...generateTokens(user.id) };
  }
}