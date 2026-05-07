import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  // No locale param available here — fall back to default for the small message.
  const t = await getTranslations("subpages.wip");
  return (
    <section className="subhero wip">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>{t("title")}</h1>
        <p className="lead">{t("body")}</p>
        <Link href="/" className="arrow-link">
          <span>{t("back")}</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
