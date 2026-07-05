import Nav from "@/components/Nav";
import ProjectVisual from "@/components/ProjectVisual";
import {
  identity,
  about,
  skills,
  projects,
  experience,
  type Project,
} from "@/lib/content";

const statusText: Record<Project["status"], { text: string; tone: string }> = {
  shipped: { text: "[shipped]", tone: "text-ok" },
  "in-progress": { text: "[in progress]", tone: "text-warn" },
  planned: { text: "[planned]", tone: "text-ink-faint" },
};

function PromptHeading({ cmd, id }: { cmd: string; id?: string }) {
  return (
    <h2 id={id} className="prompt-line mb-8 text-base font-bold text-ink">
      {cmd}
    </h2>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Nav />

      {/* ————— Hero: the session opens ————— */}
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="overflow-hidden rounded-md border border-line bg-bg-raised shadow-[0_0_0_1px_var(--bg-inset)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-ink-faint">
            <span className="h-2.5 w-2.5 rounded-full border border-line" />
            <span className="h-2.5 w-2.5 rounded-full border border-line" />
            <span className="h-2.5 w-2.5 rounded-full border border-line" />
            <span className="ml-2">kent@davao: ~</span>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="hero-in text-sm">
              <span className="text-accent font-bold">$ </span>
              <span className="type-in">whoami</span>
            </p>

            <h1
              className="display hero-in mt-5 text-3xl font-extrabold text-ink sm:text-5xl"
              style={{ "--d": "0.5s" } as React.CSSProperties}
            >
              {identity.name}
            </h1>
            <p
              className="display hero-in mt-2 text-lg font-medium text-accent sm:text-2xl"
              style={{ "--d": "0.6s" } as React.CSSProperties}
            >
              {identity.headline} — {identity.headlineQualifier}
            </p>

            <div
              className="hero-in mt-6 space-y-1 text-sm text-ink-dim"
              style={{ "--d": "0.7s" } as React.CSSProperties}
            >
              <p className="out-line">{identity.degree}</p>
              <p className="out-line">
                {identity.location} · open to junior roles, on-site or remote
              </p>
              <p className="out-line">
                builds practical software — from a medicine-verification app
                with on-device ML to this site
              </p>
            </div>

            <p
              className="hero-in mt-7 text-sm"
              style={{ "--d": "0.85s" } as React.CSSProperties}
            >
              <span className="text-accent font-bold">$ </span>
              <span className="cursor" aria-hidden />
            </p>

            <div
              className="hero-in mt-7 flex flex-wrap gap-3"
              style={{ "--d": "0.95s" } as React.CSSProperties}
            >
              <a
                href="#projects"
                className="rounded-sm bg-accent px-4 py-2 text-sm font-bold text-bg transition-colors duration-150 hover:bg-accent-deep"
              >
                ls projects/
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-line px-4 py-2 text-sm text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                github/{identity.githubHandle} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* ————— About ————— */}
        <section id="about" className="reveal border-t border-line py-16">
          <PromptHeading cmd="cat about.txt" />
          <div className="max-w-[68ch] space-y-5 text-[0.95rem] leading-[1.85] text-ink-dim">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        {/* ————— Skills ————— */}
        <section id="skills" className="reveal border-t border-line py-16">
          <PromptHeading cmd="kent --skills" />
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label}>
                <dt className="text-sm font-bold text-ink">
                  <span className="text-ink-faint"># </span>
                  {g.label}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
                  {g.items.map((s, i) => (
                    <span key={s} className="text-[0.85rem] text-ink-dim">
                      {s}
                      {i < g.items.length - 1 && (
                        <span className="text-ink-faint"> ·</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ————— Projects ————— */}
        <section id="projects" className="border-t border-line py-16">
          <div className="reveal">
            <PromptHeading cmd="ls projects/ --status" />

            {/* ls-style index */}
            <ul className="mb-12 max-w-[62ch] space-y-1.5 text-sm">
              {projects.map((p) => (
                <li key={p.slug} className="flex items-baseline gap-2">
                  <a href={`#${p.slug}`} className="link">
                    {p.slug}/
                  </a>
                  <span className="leader" aria-hidden />
                  <span className={statusText[p.status].tone}>
                    {statusText[p.status].text}
                  </span>
                  <span className="hidden text-ink-faint sm:inline">
                    {p.period.toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-14">
            {projects.map((p) => (
              <article
                key={p.slug}
                id={p.slug}
                className="reveal grid gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-10"
              >
                <ProjectVisual project={p} />

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="display text-xl font-bold text-ink">
                      {p.name}
                    </h3>
                    <span
                      className={`text-xs ${statusText[p.status].tone}`}
                    >
                      {statusText[p.status].text}
                    </span>
                    <span className="text-xs text-ink-faint">{p.period}</span>
                  </div>
                  <p className="comment mt-1 text-xs">{p.kind}</p>

                  <p className="mt-3 max-w-[62ch] text-[0.9rem] leading-[1.8] text-ink-dim">
                    {p.summary}
                  </p>

                  <ul className="mt-3 max-w-[62ch] space-y-1.5 text-[0.85rem] leading-relaxed text-ink-dim">
                    {p.points.map((pt) => (
                      <li key={pt.slice(0, 24)} className="out-line">
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="text-ink-faint">
                      {p.stack.join(" · ")}
                    </span>
                    {p.link && (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link font-bold"
                      >
                        {p.link.label} ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Experience ————— */}
        <section id="experience" className="border-t border-line py-16">
          <div className="reveal">
            <PromptHeading cmd="kent --experience" />
          </div>
          <div className="space-y-12">
            {experience.map((e) => (
              <article
                key={e.org + e.role}
                className="reveal grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-10"
              >
                <div className="text-sm text-ink-faint">
                  {e.period}
                  <div className="mt-0.5 text-xs">{e.location}</div>
                </div>
                <div>
                  <h3 className="display text-lg font-bold text-ink">
                    {e.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-ink-dim">
                    {e.org}
                    {e.detail && (
                      <span className="text-ink-faint"> — {e.detail}</span>
                    )}
                  </p>
                  <ul className="mt-3 max-w-[62ch] space-y-1.5 text-[0.875rem] leading-[1.8] text-ink-dim">
                    {e.points.map((pt) => (
                      <li key={pt.slice(0, 24)} className="out-line">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Contact ————— */}
        <section id="contact" className="reveal border-t border-line py-20">
          <PromptHeading cmd="kent --contact" />
          <p className="display max-w-[30ch] text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Looking for a junior developer who ships?
          </p>
          <p className="mt-4 max-w-[55ch] text-[0.95rem] leading-[1.8] text-ink-dim">
            Open to Junior Software Developer and Mobile Developer roles —
            on-site in Davao or remote.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="rounded-sm bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-colors duration-150 hover:bg-accent-deep"
            >
              mail {identity.email}
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              open github ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-xs text-ink-faint sm:px-8">
          <span>© 2026 Kent Lozano</span>
          <span>
            next.js · typescript · <span className="text-ink-dim">exit 0</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
