"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds the data-scrolled attribute to the <header> on desktop scroll.
 * On mobile (<=1020px) the header is non-sticky and the attribute is harmless.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (window.scrollY > 4) el.setAttribute("data-scrolled", "");
      else el.removeAttribute("data-scrolled");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="header" ref={ref}>
      {children}
    </header>
  );
}
