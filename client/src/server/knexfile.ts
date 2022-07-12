import type { Knex } from "knex";
import { getDBConfig } from "./src/db/configs";
const dbConfig = getDBConfig();

const config: Knex.Config = {
  client: "pg",
  connection: dbConfig,
  migrations: {
    extension: "ts",
  },
};

export default config;
