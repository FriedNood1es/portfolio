"use client";

import { useEffect } from "react";

/**
 * Deep links (`#kanbo`, …) target collapsed <details> rows. Open the
 * targeted row on initial load and on hash change, then re-scroll —
 * opening shifts layout, so the browser's default jump lands short.
 * Non-details hashes (sections) are left to default behavior.
 */
export default function OpenDetailsOnHash() {
  useEffect(() => {
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
