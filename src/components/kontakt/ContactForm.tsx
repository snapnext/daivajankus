"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { submitInquiry, type InquiryState } from "@/actions/inquiry";
import { TOPIC_OPTIONS } from "@/lib/contact";

const initialState: InquiryState = { status: "idle" };

const INTERPRETING_TOPICS = ["dolmetschen", "uebersetzung", "wirtschaft", "privat"] as const;
const GUARDIANSHIP_TOPICS = ["betreuung", "vorschlag", "gericht"] as const;

export function ContactForm() {
  const t = useTranslations("kontakt.form");
  const locale = useLocale();
  const search = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  const initialTopic = (() => {
    const fromQuery = search.get("topic");
    return fromQuery && (TOPIC_OPTIONS as readonly string[]).includes(fromQuery)
      ? fromQuery
      : "";
  })();
  const [topic, setTopic] = useState<string>(initialTopic);

  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
      setTopic("");
    }
  }, [state.status]);

  if (state.status === "ok") {
    return <SuccessCard onAgain={() => location.reload()} />;
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <>
      <form ref={formRef} action={formAction} noValidate>
        <input type="hidden" name="locale" value={locale} />
        <input
          type="text"
          name="company_url"
          className="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="form-fields">
          <Field label={t("name")} error={fieldErrors.name}>
            <input type="text" name="name" required autoComplete="name" />
          </Field>
          <Field label={t("email")} error={fieldErrors.email}>
            <input
              type="email"
              name="email"
              inputMode="email"
              required
              autoComplete="email"
            />
          </Field>
          <Field label={t("phone")} error={fieldErrors.phone}>
            <input type="tel" name="phone" inputMode="tel" autoComplete="tel" />
          </Field>
          <Field label={t("topic")} error={fieldErrors.topic}>
            <select
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            >
              <option value="" disabled>
                {t("topicPlaceholder")}
              </option>
              <optgroup label={t("topicGroupInterpreting")}>
                {INTERPRETING_TOPICS.map((key) => (
                  <option key={key} value={key}>
                    {t(`topicOptions.${key}`)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t("topicGroupGuardianship")}>
                {GUARDIANSHIP_TOPICS.map((key) => (
                  <option key={key} value={key}>
                    {t(`topicOptions.${key}`)}
                  </option>
                ))}
              </optgroup>
              <option value="other">{t("topicOptions.other")}</option>
            </select>
          </Field>
          <Field full label={t("urgency")}>
            <select name="urgency" defaultValue="standard">
              <option value="standard">{t("urgencyOptions.standard")}</option>
              <option value="bald">{t("urgencyOptions.bald")}</option>
              <option value="dringend">{t("urgencyOptions.dringend")}</option>
            </select>
          </Field>
          <Field full label={t("message")} error={fieldErrors.message}>
            <textarea
              name="message"
              rows={6}
              required
              placeholder={t("messagePlaceholder")}
            />
          </Field>
          <label className={`field full check${fieldErrors.consent ? " has-error" : ""}`}>
            <input type="checkbox" name="consent" value="on" required />
            <span>
              {t("consent")}
              {fieldErrors.consent ? (
                <span className="err" style={{ display: "block", marginTop: 4 }}>
                  {fieldErrors.consent}
                </span>
              ) : null}
            </span>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? t("submitting") : t("submit")}
          </button>
          <span className="form-note">{t("privacyNote")}</span>
        </div>
        {state.status === "error" && !state.fieldErrors ? (
          <div className="error-card" role="alert">
            <h4>{t("errorTitle")}</h4>
            <p>{state.message ?? t("errorBody")}</p>
          </div>
        ) : null}
      </form>
    </>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  const className = ["field", full ? "full" : "", error ? "has-error" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <label className={className}>
      <span className="lbl">{label}</span>
      {children}
      {error ? <span className="err">{error}</span> : null}
    </label>
  );
}

function SuccessCard({ onAgain }: { onAgain: () => void }) {
  const t = useTranslations("kontakt.form");
  return (
    <div className="success-card" role="status" aria-live="polite">
      <span className="check" aria-hidden="true">
        ✓
      </span>
      <h3>{t("okTitle")}</h3>
      <p>{t("okBody")}</p>
      <button type="button" className="btn btn-ghost" onClick={onAgain}>
        {t("okAgain")}
      </button>
    </div>
  );
}
