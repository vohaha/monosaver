import { Knex } from "knex";
import { hashifyPassword } from "../src/modules/auth/helpers";
import { IUser } from "../src/modules/users/types";

const testUsers: IUser[] = [
  {
    id: 1,
    email: "vohaha2011@gmail.com",
    password_hash: "",
    salt: "",
  },
  {
    id: 2,
    email: "enichka@gmail.com",
    password_hash: "",
    salt: "",
  },
];

export async function seed(knex: Knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert(
    testUsers.map((user) => ({
      ...user,
      ...hashifyPassword(user.email.split("@")[0]),
    }))
  );
}
