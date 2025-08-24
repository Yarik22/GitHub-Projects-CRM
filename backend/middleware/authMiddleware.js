import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export function authenticate(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
