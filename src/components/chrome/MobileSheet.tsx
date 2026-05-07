"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode;
};

/**
 * Header-mounted off-canvas menu for mobile (<= 1020px).
 * Owns its own open state; the trigger button lives in the same component for
 * focus/aria-expanded coupling. Body scroll is locked while open.
 */
export function MobileSheet({ children }: Props) {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change (defensive — links inside the sheet should also call onClick).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while open.
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-toggle"
        aria-expanded={open}
        aria-label={t("openMenu")}
        aria-controls="mobile-sheet"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <div
        id="mobile-sheet"
        className="mobile-sheet"
        data-open={open ? "" : undefined}
        aria-hidden={!open}
        // Capture clicks on links inside so they close the sheet before navigating.
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a, [data-close-sheet]")) setOpen(false);
        }}
      >
        <div className="mobile-sheet-head">
          <span className="wordmark-name">Daiva Jankus</span>
          <button
            type="button"
            className="mobile-toggle"
            data-close-sheet
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
