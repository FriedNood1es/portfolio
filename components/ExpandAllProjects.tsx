"use client";

/** Expand-all / collapse-all for the project <details> rows. */
export default function ExpandAllProjects() {
  const setAll = (open: boolean) => {
    document
      .querySelectorAll("#projects details")
      .forEach((el) => {
        if (el instanceof HTMLDetailsElement) el.open = open;
      });
  };
  return (
    <div className="mb-4 flex justify-end gap-2 text-xs">
      <button
        type="button"
        onClick={() => setAll(true)}
        className="flex min-h-[44px] items-center px-2 font-bold text-accent"
      >
        [open all]
      </button>
      <button
        type="button"
        onClick={() => setAll(false)}
        className="flex min-h-[44px] items-center px-2 text-ink-faint"
      >
        [close all]
      </button>
    </div>
  );
}
