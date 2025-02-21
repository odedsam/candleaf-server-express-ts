import { OAuth2Client } from "google-auth-library";
import UserModel from "../models/User";
import { ENV } from "../config/env";
import { generateTokens } from "../utils/jwt";

const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

// verify the google id token
export const verifyGoogleToken = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: ENV.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw new Error("Invalid Google Token");

  let user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    // sign up with google
    user = await UserModel.create({
      name: payload.name,
      email: payload.email,
      password: "",
      googleId: payload.sub,
    });
  }

  return generateTokens(user._id.toString());
};
