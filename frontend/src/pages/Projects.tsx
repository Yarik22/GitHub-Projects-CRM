import { useEffect, useState } from "react";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../components/ProjectItem";
import { getProjects, addProject, deleteProject, updateProject } from "../api";
import ProjectList from "../components/ProjectsList";

export default function Projects({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await getProjects(token);
      setProjects(data);
    } catch {
      setError("Failed to load projects");
    }
  }

  async function handleAdd(repoPath: string) {
    try {
      const newProject = await addProject(token, repoPath);
      setProjects((prev) => [...prev, newProject]);
    } catch {
      setError("Failed to add project");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(token, id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete project");
    }
  }

  async function handleUpdate(id: string) {
    try {
      const updatedProject = await updateProject(token, id);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updatedProject : p))
      );
    } catch {
      setError("Failed to update project");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">My Projects</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ProjectForm onAdd={handleAdd} />
      <ProjectList
        projects={projects}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
