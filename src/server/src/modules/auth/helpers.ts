import crypto from "crypto";
import { IUser } from "../users/types";

export function createHashWithSalt(payload: string, salt: string) {
  return crypto
    .pbkdf2Sync(payload, salt, 310_000, 64, "sha512")
    .toString("hex");
}

export function hashifyPassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const password_hash = createHashWithSalt(password, salt);

  return {
    salt,
    password_hash,
  };
}

export function comparePassword(password: string, user: IUser) {
  const potentialPasswordHash = createHashWithSalt(password, user.salt);
  return crypto.timingSafeEqual(
    Buffer.from(user.password_hash, "hex"),
    Buffer.from(potentialPasswordHash, "hex")
  );
}
