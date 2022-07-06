import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { userService } from "../users/service";
import { PUB_KEY } from "../../../utils/keypair/utils";

export function configurePassport(passport: passport.PassportStatic) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
  };
  const strategy = new Strategy(options, (jwtPayload, done) => {
    userService.findUserById(jwtPayload.sub).then((user) => {
      if (user == null) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
  passport.use(strategy);
}
