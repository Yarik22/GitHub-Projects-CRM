import { register, login } from "../controllers/authController.js";
import { parseJSONBody } from "../utils/bodyParser.js";

export async function authRoutes(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path === "/api/auth/register" && req.method === "POST") {
    try {
      const data = await parseJSONBody(req);
      const result = await register(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
      return true;
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  if (path === "/api/auth/login" && req.method === "POST") {
    try {
      const data = await parseJSONBody(req);
      const result = await login(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
      return true;
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  return false;
}
