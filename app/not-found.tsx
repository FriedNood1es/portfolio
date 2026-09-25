import { identity } from "@/lib/content";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-5 sm:px-8"
    >
      <p className="prompt-line text-sm text-ink-dim">kent --whereami</p>
      <h1 className="display mt-4 text-3xl font-extrabold text-ink sm:text-5xl">
        404 — nothing here
      </h1>
      <p className="comment mt-4 text-sm">
        that path never shipped — head back to the start
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/"
          className="flex min-h-[44px] items-center rounded-sm bg-accent px-4 py-2 text-sm font-bold text-bg"
        >
          cd ~/home
        </a>
        <a
          href={`mailto:${identity.email}`}
          className="flex min-h-[44px] items-center rounded-sm border border-line px-4 py-2 text-sm text-ink"
        >
          mail kent
        </a>
      </div>
    </main>
  );
}
