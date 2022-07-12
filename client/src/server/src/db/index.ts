import { Pool } from "pg";
import { getDBConfig } from "./configs";

const dbConfig = getDBConfig();

const pool = new Pool(dbConfig);

async function query(text: string, params: unknown[]) {
  return await pool.query(text, params);
}

export const db = {
  query,
};
