import Image from "next/image";
import type { Project } from "@/lib/content";

const statusText: Record<Project["status"], { text: string; tone: string }> = {
  shipped: { text: "[shipped]", tone: "text-ok" },
  "in-progress": { text: "[in progress]", tone: "text-warn" },
  planned: { text: "[planned]", tone: "text-ink-faint" },
};

/**
 * The 16:10 visual slot for a project. Renders the real screenshot when
 * `project.image` is set (drop the file in /public/projects and set the path
 * in lib/content.ts); until then, a "no signal" terminal pane holds the slot.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      </div>
    );
  }

  const status = statusText[project.status];

  return (
    <div
      role="img"
      aria-label={`${project.name} — screenshot pending`}
      className="flex aspect-[16/10] flex-col overflow-hidden rounded-sm border border-line bg-bg-inset"
    >
      {/* pane title bar */}
      <div className="flex items-center justify-between border-b border-line bg-bg-raised px-3 py-1.5 text-[0.65rem] text-ink-faint">
        <span>{project.slug}.png</span>
        <span className={status.tone}>{status.text}</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="display text-lg font-bold text-ink sm:text-xl">
          {project.name}
        </div>
        <div className="text-[0.7rem] text-ink-faint">
          {project.status === "shipped"
            ? "░░ screenshot pending ░░"
            : "░░ no signal yet ░░"}
        </div>
        <div className="text-[0.65rem] text-ink-faint">
          {project.stack.slice(0, 3).join(" · ")}
        </div>
      </div>
    </div>
  );
}
