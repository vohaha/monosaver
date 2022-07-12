import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("password_hash").notNullable();
      table.string("salt").notNullable();
      table.timestamps(true, true);
    })
    .createTable("groups", function (table) {
      table.increments("id").primary();
      table.string("name", 20).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users").dropTable("groups");
}
