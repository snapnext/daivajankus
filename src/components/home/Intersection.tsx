import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type Case = { title: string; body: string };

export function Intersection() {
  const t = useTranslations("intersection");
  const cases = t.raw("cases") as Case[];

  return (
    <section className="band band-forest">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow on-forest">{t("eyebrow")}</span>
            <h2>{t("title")}</h2>
          </div>
        </div>
        <div className="inter-grid">
          <p className="inter-body">{t("body")}</p>
          <div className="inter-cases">
            {cases.map((entry, idx) => (
              <div key={idx} className="inter-case">
                <span className="num">{String(idx + 1).padStart(2, "0")}</span>
                <h4>{entry.title}</h4>
                <p>{entry.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="inter-cta">
          <Link href="/kontakt" className="btn btn-amber-outline on-forest">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
