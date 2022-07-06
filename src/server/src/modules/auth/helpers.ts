import { IUser, UIUser } from "../users/types";
import * as jsonwebtoken from "jsonwebtoken";
import * as crypto from "crypto";
import { PRIV_KEY } from "../../../utils/keypair/utils";
import { AuthConfig } from "./type";

function createHash(payload: string, salt: string): string {
  return crypto
    .pbkdf2Sync(payload, salt, 100_000, 64, "sha512")
    .toString("hex");
}

export function validatePassword(password: string, hash: string, salt: string) {
  const hashVerify = createHash(password, salt);
  return hash === hashVerify;
}

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const password_hash = createHash(password, salt);

  return {
    salt,
    password_hash,
  };
}

export function issueJWT(user: IUser): AuthConfig {
  const payload: Omit<UIUser, "iat" | "exp"> = {
    sub: user.id,
    email: user.email,
  };
  const expiresIn = "1d";

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn,
  });

  return {
    token: signedToken,
  };
}
