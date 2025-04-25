import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { ENV } from "../../config/env";



passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID!,
      clientSecret: ENV.GOOGLE_SECRET_ID!,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"], 
    },
    (_accessToken, _refreshToken, profile: Profile, done) => {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value, 
        photo: profile.photos?.[0]?.value, 
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
  console.log("user from seralize user",user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});