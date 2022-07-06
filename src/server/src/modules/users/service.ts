import { IUser } from "./types";
import { User } from "./model";
import { generatePassword } from "../auth/helpers";

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
      return null;
    }
    const passwordData = generatePassword(password);
    return await User.create({ email, ...passwordData });
  },
  async findUserByEmail(email: string): Promise<IUser> {
    return await User.findOneByEmail(email);
  },
  async findUserById(id: number): Promise<IUser> {
    return await User.findOneById(id);
  },
};
