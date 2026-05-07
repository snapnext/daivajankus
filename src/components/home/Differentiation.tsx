import { useTranslations } from "next-intl";

type Item = { title: string; body: string };

export function Differentiation() {
  const t = useTranslations("differentiation");
  const items = t.raw("items") as Item[];

  return (
    <section className="band tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("title")}</h2>
          </div>
        </div>
        <div className="diff-grid">
          {items.map((item, idx) => (
            <div key={idx} className="diff-item">
              <div className="diff-numeral">{String(idx + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
