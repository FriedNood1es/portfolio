"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="flex min-h-[44px] items-center text-sm font-bold text-ink"
        >
          <span className="text-accent">~</span>/kent-lozano
        </a>

        <nav className="hidden gap-6 sm:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`flex min-h-[44px] items-center text-sm transition-colors duration-150 hover:text-accent focus-visible:text-accent ${
                active === l.href
                  ? "text-accent underline decoration-accent/60 underline-offset-8"
                  : "text-ink-dim"
              }`}
            >
              ./{l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-xs uppercase tracking-widest text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? "[x]" : "[=]"} menu
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Menu"
          className="flex flex-col border-t border-line bg-bg-raised px-5 py-1 sm:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`flex min-h-[44px] items-center border-b border-line text-sm last:border-0 ${
                active === l.href ? "text-accent" : "text-ink-dim"
              }`}
              onClick={() => setOpen(false)}
            >
              ./{l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
