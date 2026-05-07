import type { ReactNode } from "react";

// The locale-aware <html> tag lives in app/[locale]/layout.tsx.
// This top-level layout is a passthrough so the [locale] segment can own <html>/<body>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
