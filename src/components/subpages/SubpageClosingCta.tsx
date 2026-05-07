import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";

type Props = {
  /** Section title, e.g. "Termin oder beglaubigte Übersetzung anfragen." */
  title: string;
  /** Optional topic key — prefilled into the kontakt form via ?topic=. */
  topic?: string;
};

export function SubpageClosingCta({ title, topic }: Props) {
  const t = useTranslations("closing");
  return (
    <section className="closing-cta">
      <div className="container">
        <h2>{title}</h2>
        <div className="ways">
          <div className="way">
            <span className="label">{t("phoneLabel")}</span>
            <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a>
          </div>
          <div className="way">
            <span className="label">{t("emailLabel")}</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div className="way">
            <span className="label">{t("formLabel")}</span>
            <Link
              href={
                topic
                  ? { pathname: "/kontakt", query: { topic } }
                  : "/kontakt"
              }
            >
              {t("formCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
