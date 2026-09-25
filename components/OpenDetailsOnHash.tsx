"use client";

import { useEffect } from "react";

/**
 * Deep links (`#kanbo`, …) target collapsed <details> rows. Open the
 * targeted row on initial load and on hash change, then re-scroll —
 * opening shifts layout, so the browser's default jump lands short.
 * Non-details hashes (sections) are left to default behavior.
 * PINNED: desktop opens all project rows up front so evidence is visible
 * without extra clicks; mobile keeps first-open for length.
 */
export default function OpenDetailsOnHash() {
  useEffect(() => {
    if (
      !window.location.hash &&
      window.matchMedia("(min-width: 640px)").matches
    ) {
      document.querySelectorAll("#projects details").forEach((el) => {
        if (el instanceof HTMLDetailsElement) el.open = true;
      });
    }
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) {
        return;
      }
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement && !el.open) {
        el.open = true;
        requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  return null;
}
