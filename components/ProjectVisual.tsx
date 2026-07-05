import Image from "next/image";
import type { Project } from "@/lib/content";

/**
 * The 16:10 visual slot for a project card.
 * Renders the real screenshot when `project.image` is set (drop the file in
 * /public and set the path in lib/content.ts); until then, a styled
 * project-branded placeholder panel keeps the layout finished.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line">
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

  return (
    <div
      role="img"
      aria-label={`${project.name} — screenshot coming soon`}
      className="panel-hatch relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-md p-4"
      style={{
        background: `linear-gradient(145deg,
          hsl(${project.hue} 34% 24%),
          hsl(${project.hue} 42% 14%) 65%,
          hsl(${(project.hue + 40) % 360} 38% 17%))`,
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
          {project.status === "shipped" ? "screenshot pending" : project.period}
        </span>
        <span className="font-mono text-[0.65rem] text-white/30">16:10</span>
      </div>

      <div>
        <div className="display text-2xl text-white/90 sm:text-3xl">
          {project.name}
        </div>
        <div className="mt-1 font-mono text-[0.65rem] tracking-wide text-white/45">
          {project.stack.slice(0, 3).join(" · ")}
        </div>
      </div>

      {/* corner registration marks, like a print proof */}
      <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-white/25" />
      <span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-white/25" />
      <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/25" />
      <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/25" />
    </div>
  );
}
