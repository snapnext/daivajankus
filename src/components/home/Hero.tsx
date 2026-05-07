import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PhoneIcon } from "@/components/chrome/PhoneIcon";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-portrait">
          <ImageSlot
            src="/images/daiva-portrait.png"
            shape="rect"
            filter="low"
            alt={t("portraitAlt")}
            priority
          />
          <div className="caption">{t("portraitCaption")}</div>
        </div>
        <div className="hero-content">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 id="hero-title">{t("title")}</h1>
          <p className="lead">{t("lead")}</p>
          <div className="hero-actions">
            <Link href="/kontakt" className="btn btn-primary">
              {t("ctaPrimary")}
            </Link>
            <a href={`tel:${CONTACT.phoneTel}`} className="btn btn-ghost">
              <PhoneIcon />
              <span>{t("ctaSecondary")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
