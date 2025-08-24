import ProjectItem, { type Project } from "./ProjectItem";

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function ProjectList({
  projects,
  onDelete,
  onUpdate,
}: ProjectListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 min-w-[600px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1 text-left">Owner</th>
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">URL</th>
            <th className="px-2 py-1">Stars</th>
            <th className="px-2 py-1">Forks</th>
            <th className="px-2 py-1">Issues</th>
            <th className="px-2 py-1">Created</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <ProjectItem
              key={p.id}
              project={p}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
