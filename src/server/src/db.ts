import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

if (
  process.env.POSTGRES_PORT == null ||
  process.env.POSTGRES_DB == null ||
  process.env.POSTGRES_USER == null ||
  process.env.POSTGRES_PASSWORD == null
) {
  process.exit(1);
}

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT,
});

async function query(text: string, params: []) {
  return await pool.query(text, params);
}

export const db = {
  query,
};
