export interface Project {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  created_at: number;
}

export default function ProjectItem({
  project,
  onDelete,
  onUpdate,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}) {
  return (
    <tr className="border-b text-sm sm:text-base">
      <td>{project.owner}</td>
      <td>{project.name}</td>
      <td>
        <a
          href={project.url}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          {project.url}
        </a>
      </td>
      <td>{project.stars}</td>
      <td>{project.forks}</td>
      <td>{project.issues}</td>
      <td>
        {project.created_at
          ? `${new Date(
              Number(project.created_at)
            ).toLocaleDateString()}(${Math.floor(
              Number(project.created_at) / 1000
            )})`
          : "N/A"}
      </td>
      <td className="flex gap-1 flex-wrap">
        <button
          onClick={() => onUpdate(project.id)}
          className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition-colors duration-200"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
