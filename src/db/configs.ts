import * as dotenv from "dotenv";
dotenv.config();

export function getDBConfig() {
  if (
    process.env.POSTGRES_HOST == null ||
    process.env.POSTGRES_PORT == null ||
    process.env.POSTGRES_DB == null ||
    process.env.POSTGRES_USER == null ||
    process.env.POSTGRES_PASSWORD == null ||
    isNaN(parseInt(process.env.POSTGRES_PORT, 10))
  ) {
    process.exit(1);
  }

  return {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
}
