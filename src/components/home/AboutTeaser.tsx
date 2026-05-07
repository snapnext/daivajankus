import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function AboutTeaser() {
  const t = useTranslations("aboutTeaser");
  return (
    <section className="band tight">
      <div className="container">
        <div className="about-teaser-grid">
          <ImageSlot
            src="/images/daiva-schreibtisch.png"
            shape="square"
            filter="mid"
            alt={t("photoAlt")}
          />
          <div className="body">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("title")}</h2>
            <p>{t("body")}</p>
            <Link href="/ueber" className="arrow-link">
              <span>{t("cta")}</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
