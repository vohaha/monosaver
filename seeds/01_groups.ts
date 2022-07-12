import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("groups").del();

  // Inserts seed entries
  await knex("groups").insert([
    { id: 1, name: "Food" },
    { id: 2, name: "Health" },
    { id: 3, name: "Bills" },
  ]);
}
