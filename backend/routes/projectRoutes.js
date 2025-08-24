import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { parseJSONBody } from "../utils/bodyParser.js";
import { authenticate } from "../middleware/authMiddleware.js";

export async function projectRoutes(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    const userId = authenticate(req);

    if (path === "/api/projects" && req.method === "GET") {
      const projects = await getProjects(userId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(projects));
      return true;
    }

    if (path === "/api/projects" && req.method === "POST") {
      const data = await parseJSONBody(req);
      const project = await addProject(userId, data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(project));
      return true;
    }
    if (path.startsWith("/api/projects/") && req.method === "DELETE") {
      const projectId = path.split("/")[3];
      const deleted = await deleteProject(userId, projectId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deleted));
      return true;
    }
    if (path.startsWith("/api/projects/") && req.method === "PATCH") {
      const projectId = path.split("/")[3];
      const updated = await updateProject(userId, projectId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updated));
      return true;
    }
  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
    return true;
  }

  return false;
}
