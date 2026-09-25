import Nav from "@/components/Nav";
import OpenDetailsOnHash from "@/components/OpenDetailsOnHash";
import ExpandAllProjects from "@/components/ExpandAllProjects";
import ProjectVisual from "@/components/ProjectVisual";
import Icon from "@/components/Icons";
import {
  identity,
  about,
  skills,
  projects,
  experience,
  education,
  statusText,
} from "@/lib/content";

function PromptHeading({
  cmd,
  title,
  hint,
  id,
}: {
  cmd: string;
  title: string;
  hint?: string;
  id?: string;
}) {
  return (
    <>
      <h2 id={id} className="display mb-1 text-lg font-bold text-ink">
        {title}
      </h2>
      <p className="prompt-line mb-8 text-xs text-ink-faint">
        {cmd}
        {hint ? (
          <span className="text-ink-dim"> — {hint}</span>
        ) : (
          ""
        )}
      </p>
    </>
  );
}

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <OpenDetailsOnHash />

      <main id="main">
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
                {identity.location} · open to entry-level roles, on-site or
                remote
              </p>
              <p className="mt-2 max-w-[62ch] font-medium text-ink">
                Entry-level Software Developer — Flutter, TypeScript, React —
                this site is the live proof.
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
                className="flex min-h-[44px] items-center rounded-sm bg-accent px-4 py-2 text-sm font-bold text-bg transition-colors duration-150 hover:bg-accent-deep focus-visible:bg-accent-deep"
              >
                ls projects/
              </a>
            </div>
            <div
              className="hero-in mt-2 flex flex-wrap items-center gap-x-5 gap-y-1"
              style={{ "--d": "1.05s" } as React.CSSProperties}
            >
              <a
                href={`mailto:${identity.email}`}
                className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink-dim"
              >
                <Icon name="mail" />
                mail kent
              </a>
              <a
                href={identity.resume}
                target="_blank"
                rel="noreferrer"
                className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink-dim"
              >
                <Icon name="download" />
                resume.pdf
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink-dim"
              >
                <Icon name="github" />
                {identity.githubHandle}
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm text-ink-dim"
              >
                <Icon name="linkedin" />
                in/{identity.linkedinHandle}
              </a>
            </div>
          </div>
        </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* ————— About ————— */}
        <section id="about" className="reveal border-t border-line py-16">
          <PromptHeading cmd="cat about.txt" title="About me" />
          <div className="max-w-[68ch] space-y-5 text-[0.95rem] leading-[1.85] text-ink-dim">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        {/* ————— Skills ————— */}
        <section id="skills" className="reveal border-t border-line py-16">
          <PromptHeading cmd="kent --skills" title="Technical skills" />
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {/* Top-2 groups up front (order curated in lib/content.ts); the rest fold into "Also". */}
            {skills.slice(0, 2).map((g) => (
              <div key={g.label}>
                <dt className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon name={g.icon} className="h-4 w-4 shrink-0 text-accent" />
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
            <div className="sm:col-span-2">
              <dt className="text-sm font-bold text-ink">Also</dt>
              <dd className="mt-2 divide-y divide-line border-y border-line">
                {skills.slice(2).map((g) => (
                  <p key={g.label} className="py-3 text-[0.85rem] text-ink-dim">
                    <span className="font-bold text-ink">{g.label}: </span>
                    {g.items.join(" · ")}
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {/* ————— Projects ————— */}
        <section id="projects" className="border-t border-line py-16">
          <div className="reveal">
            <PromptHeading
              cmd="ls projects/ --status"
              title="Selected work"
              hint="click a project to expand details"
            />

            {/* ls-style index */}
            <ul className="mb-12 max-w-[62ch] space-y-1.5 text-sm">
              {projects.map((p) => (
                <li key={p.slug} className="flex items-center gap-2">
                  <a
                    href={`#${p.slug}`}
                    className="link inline-flex min-h-[44px] items-center"
                  >
                    {p.slug}/
                  </a>
                  <span className="leader" aria-hidden />
                  <span className={statusText[p.status].tone}>
                    {statusText[p.status].text}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {p.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <ExpandAllProjects />
            {projects.map((p, i) => (
              <details
                key={p.slug}
                id={p.slug}
                open={i === 0}
                className="reveal group scroll-mt-24 rounded-sm border border-line bg-bg-raised"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="font-bold text-accent"
                  >
                    <span className="hidden group-open:inline">−</span>
                    <span className="group-open:hidden">+</span>
                  </span>
                  <span className="text-xs font-bold text-accent" aria-hidden="true">
                    <span className="group-open:hidden">expand ▸</span>
                    <span className="hidden group-open:inline">collapse ▾</span>
                  </span>
                  <span className="display text-base font-bold text-ink">
                    {p.name}
                  </span>
                  <span
                    className={`text-xs ${statusText[p.status].tone}`}
                  >
                    {statusText[p.status].text}
                  </span>
                  <span className="hidden text-xs text-ink-faint sm:inline">
                    {p.period}
                  </span>
                </summary>

                <div className="grid gap-6 border-t border-line px-4 py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-10">
                  <ProjectVisual project={p} />

                  <div>
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
                      {p.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link inline-flex min-h-[44px] items-center font-bold"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ————— Experience ————— */}
        <section id="experience" className="border-t border-line py-16">
          <div className="reveal">
            <PromptHeading cmd="kent --experience" title="Work experience" />
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

        {/* ————— Education ————— */}
        <section id="education" className="border-t border-line py-16">
          <div className="reveal">
            <PromptHeading cmd="kent --education" title="Education" />
          </div>
          <article className="reveal grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-10">
            <div className="text-sm text-ink-faint">
              {education.period}
              <div className="mt-0.5 text-xs">{education.location}</div>
            </div>
            <div>
              <h3 className="display text-lg font-bold text-ink">
                {education.degree}
              </h3>
              <p className="mt-0.5 text-sm text-ink-dim">{education.org}</p>
              <p className="comment mt-3 text-xs">
                Capstone: {education.capstone}
              </p>
              <p className="mt-2 max-w-[62ch] text-[0.875rem] leading-[1.8] text-ink-dim">
                Coursework: {education.coursework.join(" · ")}
              </p>
            </div>
          </article>
        </section>

        {/* ————— Contact ————— */}
        <section id="contact" className="reveal border-t border-line py-20">
          <PromptHeading cmd="kent --contact" title="Contact" />
          <p className="display max-w-[30ch] text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Looking for an entry-level developer who ships?
          </p>
          <p className="mt-4 max-w-[55ch] text-[0.95rem] leading-[1.8] text-ink-dim">
            Open to entry-level Software Developer roles — web, full-stack, or
            mobile — on-site in Davao or remote.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="flex min-h-[44px] items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-colors duration-150 hover:bg-accent-deep focus-visible:bg-accent-deep"
            >
              <Icon name="mail" />
              {identity.email}
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[44px] items-center gap-2 rounded-sm border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            >
              <Icon name="github" />
              github
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[44px] items-center gap-2 rounded-sm border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            >
              <Icon name="linkedin" />
              linkedin
            </a>
          </div>
          </section>
        </div>
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
