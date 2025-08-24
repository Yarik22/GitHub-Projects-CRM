import { useState } from "react";

export default function ProjectForm({
  onAdd,
}: {
  onAdd: (repoPath: string) => void;
}) {
  const [repoPath, setRepoPath] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repoPath.trim()) {
      setError("Repo path cannot be empty");
      return;
    }
    setError("");
    onAdd(repoPath.trim());
    setRepoPath("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-4"
    >
      <input
        className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="facebook/react"
        value={repoPath}
        onChange={(e) => setRepoPath(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm sm:hidden">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        type="submit"
      >
        Add
      </button>
      {error && <p className="text-red-500 text-sm hidden sm:block">{error}</p>}
    </form>
  );
}
