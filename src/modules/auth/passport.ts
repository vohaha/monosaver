import passport from "passport";
import { Strategy } from "passport-local";
import { userService } from "../users/service";
import { comparePassword, createHashWithSalt } from "./helpers";
import crypto from "crypto";

const inMemorySessionStorage = new Map();

export function configurePassport(passport: passport.PassportStatic) {
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        userService
          .findUserByEmail(email)
          .then((user) => {
            if (user == null) {
              return done(null, false, { message: "Incorrect email." });
            }
            const potentialPasswordHash = createHashWithSalt(
              password,
              user.salt
            );
            const isValid = comparePassword(potentialPasswordHash, user);
            if (isValid) {
              return done(null, false, {
                message: "Incorrect password.",
              });
            }
            return done(null, user);
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser<string>((user, cb) => {
    const sessionId = crypto.randomBytes(32).toString("hex");
    inMemorySessionStorage.set(sessionId, user);
    cb(null, sessionId);
  });

  passport.deserializeUser<number>(function (sessionId, cb) {
    const user = inMemorySessionStorage.get(sessionId);
    if (user == null) {
      return cb(new Error("User not found"), false);
    }
    cb(null, user);
  });
}
