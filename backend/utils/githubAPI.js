import fetch from "node-fetch";

export async function fetchGitHubRepo(repoPath) {
  const response = await fetch(`https://api.github.com/repos/${repoPath}`);
  if (!response.ok) throw new Error("GitHub repo not found");
  const data = await response.json();
  return data;
}
