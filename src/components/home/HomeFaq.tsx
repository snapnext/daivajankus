import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FaqList, type FaqEntry } from "@/components/ui/Faq";

export function HomeFaq() {
  const t = useTranslations("homeFaq");
  const items = t.raw("items") as FaqEntry[];

  return (
    <section className="band tight" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("title")}</h2>
          </div>
        </div>
        <FaqList items={items} />
        <div className="faq-foot">
          <Link href="/dolmetschen" className="arrow-link">
            <span>{t("moreInterpreting")}</span>
            <span className="arrow">→</span>
          </Link>
          <Link href="/rechtliche-betreuung" className="arrow-link">
            <span>{t("moreGuardianship")}</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
