"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          <span className="text-green">✚</span> kent lozano
        </a>

        <nav className="hidden gap-7 sm:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft transition-colors hover:text-green"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-widest text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="flex flex-col border-t border-line bg-paper-raised px-5 py-2 sm:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-b border-line py-3 text-sm text-ink-soft last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
