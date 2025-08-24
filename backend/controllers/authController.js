import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as User from "../models/userModel.js";

import bcrypt from "bcrypt";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export async function register({ email, password, github_username }) {
  const user = await User.createUser(email, password, github_username);
  return { user };
}
export async function login({ email, password }) {
  const user = await User.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  return { token };
}
