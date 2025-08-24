import http from "http";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";
import { projectRoutes } from "./routes/projectRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  const handledByAuth = await authRoutes(req, res);
  if (handledByAuth) return;

  const handledByProject = await projectRoutes(req, res);
  if (handledByProject) return;

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
