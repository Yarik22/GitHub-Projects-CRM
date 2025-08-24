import * as Project from "../models/projectModel.js";
import { fetchGitHubRepo } from "../utils/githubAPI.js";

export async function addProject(userId, { repoPath }) {
  if (!repoPath) throw new Error("repoPath is required");

  const data = await fetchGitHubRepo(repoPath);
  const project = await Project.createProject(userId, {
    owner: data.owner.login,
    name: data.name,
    url: data.html_url,
    stars: data.stargazers_count,
    forks: data.forks_count,
    issues: data.open_issues_count,
    created_at: new Date(data.created_at).getTime(),
  });
  return project;
}

export async function getProjects(userId) {
  return await Project.getProjectsByUser(userId);
}

export async function deleteProject(userId, projectId) {
  return await Project.deleteProjectByUser(userId, projectId);
}

export async function updateProject(userId, projectId) {
  const existingProjects = await Project.getProjectsByUser(userId);
  const project = existingProjects.find(p => p.id === projectId);
  if (!project) throw new Error("Project not found");

  const repoPath = `${project.owner}/${project.name}`;
  const data = await fetchGitHubRepo(repoPath);

  const updated = await Project.updateProjectStats(projectId, {
    stars: data.stargazers_count,
    forks: data.forks_count,
    issues: data.open_issues_count,
  });

  return updated;
}