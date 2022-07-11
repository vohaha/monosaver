import { IUser } from "./types";
import { User } from "./model";
import { hashifyPassword } from "../auth/helpers";

export const userService = {
  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser | null> {
    const user = await User.findOneByEmail(email);
    if (user != null) {
      console.error("User already exists");
      return null;
    }
    return await User.create({ email, ...hashifyPassword(password) });
  },
  async findUserByEmail(email: string): Promise<IUser> {
    return await User.findOneByEmail(email);
  },
  async findUserById(id: number): Promise<IUser> {
    return await User.findOneById(id);
  },
};
