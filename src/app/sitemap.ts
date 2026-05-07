import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

// Routes that exist for every locale. Keep this in sync with src/app/[locale]/.
const ROUTES = ["", "/dolmetschen", "/rechtliche-betreuung", "/ueber", "/kontakt"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => {
      const url = `${SITE_URL}/${locale}${route}`;
      return {
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : route === "/kontakt" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`]),
          ),
        },
      };
    }),
  );
}
