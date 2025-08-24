import { query } from "../db/index.js";
import bcrypt from "bcrypt";

export async function createUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  const result = await query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hash]
  );
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}
