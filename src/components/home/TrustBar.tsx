import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");
  // Reading the array from messages — see messages/{locale}.json (trust.items).
  const items = t.raw("items") as string[];
  return (
    <section className="trust" aria-label={t("ariaLabel")}>
      <div className="trust-inner">
        {items.map((item, idx) => (
          <div key={idx} className="trust-item">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
