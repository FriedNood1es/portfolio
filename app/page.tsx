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

const statusLabel: Record<Project["status"], string | null> = {
  shipped: null,
  "in-progress": "In progress",
  planned: "Planned",
};

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-xs text-ink-faint">{n}</span>
      <h2 className="display text-3xl sm:text-4xl">{title}</h2>
      <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden />
    </div>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Nav />

      {/* ————— Hero ————— */}
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <p className="overline hero-in">
          {identity.location} · open to junior roles
        </p>
        <h1
          className="display hero-in mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-7xl"
          style={{ "--d": "0.08s" } as React.CSSProperties}
        >
          {identity.headline}
          <span className="block text-green">
            — {identity.headlineQualifier}.
          </span>
        </h1>
        <p
          className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          style={{ "--d": "0.16s" } as React.CSSProperties}
        >
          I build practical software — from a medicine-verification app with
          on-device machine learning to the site you&rsquo;re reading now.{" "}
          <span className="text-ink">{identity.degree}.</span>
        </p>
        <div
          className="hero-in mt-9 flex flex-wrap gap-4"
          style={{ "--d": "0.24s" } as React.CSSProperties}
        >
          <a
            href="#projects"
            className="rounded-sm bg-green px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-green-deep"
          >
            See my work
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-line bg-paper-raised px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-green hover:text-green"
          >
            github/{identity.githubHandle}
          </a>
        </div>
      </section>

      <main>
        {/* ————— About ————— */}
        <section id="about" className="border-t border-line">
          <div className="reveal mx-auto max-w-5xl px-5 py-20 sm:px-8">
            <SectionHeading n="01" title="About" />
            <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              {about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ————— Skills ————— */}
        <section id="skills" className="border-t border-line">
          <div className="reveal mx-auto max-w-5xl px-5 py-20 sm:px-8">
            <SectionHeading n="02" title="Skills" />
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {skills.map((g) => (
                <div key={g.label}>
                  <dt className="overline">{g.label}</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-sm border border-line bg-paper-raised px-2.5 py-1 text-[0.8rem] text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ————— Projects ————— */}
        <section id="projects" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
            <div className="reveal">
              <SectionHeading n="03" title="Projects" />
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              {projects.map((p) => (
                <article
                  key={p.slug}
                  className="reveal flex flex-col rounded-md border border-line bg-paper-raised p-5 shadow-[0_1px_0_var(--line)]"
                >
                  <ProjectVisual project={p} />

                  <div className="mt-5 flex items-baseline justify-between gap-3">
                    <h3 className="display text-2xl">{p.name}</h3>
                    {statusLabel[p.status] ? (
                      <span className="rounded-sm bg-green-tint px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-green">
                        {statusLabel[p.status]}
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-ink-faint">
                        {p.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">
                    {p.kind}
                  </p>

                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>

                  <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-ink-soft">
                    {p.points.map((pt) => (
                      <li key={pt.slice(0, 24)} className="flex gap-2.5">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="font-mono text-[0.7rem] text-ink-faint">
                      {p.stack.join(" · ")}
                    </span>
                    {p.link && (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-green shrink-0 text-sm font-medium"
                      >
                        {p.link.label} ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ————— Experience ————— */}
        <section id="experience" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
            <div className="reveal">
              <SectionHeading n="04" title="Experience" />
            </div>
            <div className="space-y-12">
              {experience.map((e) => (
                <article
                  key={e.org + e.role}
                  className="reveal grid gap-4 sm:grid-cols-[11rem_1fr] sm:gap-10"
                >
                  <div className="font-mono text-sm text-ink-faint">
                    {e.period}
                    <div className="mt-1 text-[0.7rem]">{e.location}</div>
                  </div>
                  <div>
                    <h3 className="display text-xl">{e.role}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {e.org}
                      {e.detail && (
                        <span className="text-ink-faint"> — {e.detail}</span>
                      )}
                    </p>
                    <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">
                      {e.points.map((pt) => (
                        <li key={pt.slice(0, 24)} className="flex gap-2.5">
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-green" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ————— Contact ————— */}
        <section id="contact" className="border-t border-line bg-green-tint/50">
          <div className="reveal mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
            <p className="overline">Contact</p>
            <h2 className="display mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
              Looking for a junior developer who ships?
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-soft">
              I&rsquo;m open to Junior Software Developer and Mobile Developer
              roles — on-site in Davao or remote.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${identity.email}`}
                className="rounded-sm bg-green px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-green-deep"
              >
                {identity.email}
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-line bg-paper-raised px-6 py-3 font-mono text-sm transition-colors hover:border-green hover:text-green"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 font-mono text-xs text-ink-faint sm:px-8">
          <span>© 2026 Kent Lozano</span>
          <span>Next.js · TypeScript · deployed on Vercel</span>
        </div>
      </footer>
    </div>
  );
}
