import { db } from "../../db";
import { IUser } from "./types";

export const User = {
  async create({
    email,
    password_hash,
    salt,
  }: {
    email: string;
    password_hash: string;
    salt: string;
  }): Promise<IUser> {
    const result = await db.query(
      `INSERT INTO users (email, password_hash, salt) VALUES ($1, $2, $3) RETURNING *`,
      [email, password_hash, salt]
    );
    return result.rows[0];
  },
  async findOneByEmail(email: string): Promise<IUser> {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  },
  async findOneById(id: number): Promise<IUser> {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  },
};
