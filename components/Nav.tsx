"use client";

import { useState } from "react";

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
              className="flex min-h-[44px] items-center text-sm text-ink-dim transition-colors duration-150 hover:text-accent focus-visible:text-accent"
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
              className="flex min-h-[44px] items-center border-b border-line text-sm text-ink-dim last:border-0"
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
