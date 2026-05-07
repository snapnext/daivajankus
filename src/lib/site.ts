// Single source of truth for the production URL. Override per-environment via
// the NEXT_PUBLIC_SITE_URL env var (set this on Vercel before going live so
// canonical / sitemap / OG / robots all point to the real domain).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://daivajankus.de"
).replace(/\/$/, "");

export const SITE_NAME = "Daiva Jankus";

/** Build an absolute URL from a path that starts with `/`. */
export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
