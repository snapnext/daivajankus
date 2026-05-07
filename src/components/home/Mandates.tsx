import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function Mandates() {
  const t = useTranslations("mandates");

  return (
    <section className="band" id="mandate">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("title")}</h2>
          </div>
          <p className="lede">{t("lede")}</p>
        </div>

        <div className="mandates">
          <Column
            href="/dolmetschen"
            eyebrow={t("i.eyebrow")}
            title={t("i.title")}
            subline={t("i.subline")}
            desc={t("i.desc")}
            fields={t("i.fields")}
            cta={t("i.cta")}
            dotVariant="amber"
          />
          <Column
            href="/rechtliche-betreuung"
            eyebrow={t("ii.eyebrow")}
            title={t("ii.title")}
            subline={t("ii.subline")}
            desc={t("ii.desc")}
            fields={t("ii.fields")}
            cta={t("ii.cta")}
            dotVariant="forest"
          />
        </div>
      </div>
    </section>
  );
}

type ColumnProps = {
  href: "/dolmetschen" | "/rechtliche-betreuung";
  eyebrow: string;
  title: string;
  subline: string;
  desc: string;
  fields: string;
  cta: string;
  dotVariant: "amber" | "forest";
};

function Column({ href, eyebrow, title, subline, desc, fields, cta, dotVariant }: ColumnProps) {
  return (
    <div className="mandate-col">
      <span className="eyebrow">
        <span className={dotVariant === "forest" ? "dot forest" : "dot"} />
        <span>{eyebrow}</span>
      </span>
      <h3>{title}</h3>
      <span className="subline">{subline}</span>
      <p className="desc">{desc}</p>
      <div className="fields">{fields}</div>
      <Link href={href} className="arrow-link">
        <span>{cta}</span>
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
