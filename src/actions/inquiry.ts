"use server";

import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

import { CONTACT, inquirySchema, TOPIC_OPTIONS, URGENCY_OPTIONS } from "@/lib/contact";
import { routing, type Locale } from "@/i18n/routing";

export type InquiryState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message?: string; fieldErrors?: Record<string, string> };

function pickLocale(raw: FormDataEntryValue | null): Locale {
  const value = typeof raw === "string" ? raw : "";
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : routing.defaultLocale;
}

/**
 * Server Action invoked by the contact form. Validates input, sends a notification
 * to the configured RESEND_TO mailbox, and returns a discriminated state object
 * that the client renders via React 19's useActionState.
 *
 * If RESEND_API_KEY is missing (e.g. local preview without secrets) the action
 * still returns "ok" so the success card can be exercised — the message is logged
 * to the server console with a clear marker.
 */
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const locale = pickLocale(formData.get("locale"));
  const t = await getTranslations({ locale, namespace: "kontakt.form" });

  const parsed = inquirySchema({
    name: t("errors.name"),
    email: t("errors.email"),
    topic: t("errors.topic"),
    message: t("errors.message"),
    consent: t("errors.consent"),
  }).safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — silently succeed if filled.
  if (data.company_url) return { status: "ok" };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Daiva Jankus <onboarding@resend.dev>";
  const to = process.env.RESEND_TO ?? CONTACT.email;

  const subject = subjectFor(data.topic, data.name);
  const html = htmlBody(data, locale);
  const text = textBody(data, locale);

  if (!apiKey) {
    // Useful for local dev / preview deploys where the key is intentionally absent.
    console.warn("[inquiry] RESEND_API_KEY missing — skipping send.\n", text);
    return { status: "ok" };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (result.error) {
        console.error("[inquiry] Resend error:", result.error);
      return { status: "error", message: result.error.message };
    }
    return { status: "ok" };
  } catch (err) {
    console.error("[inquiry] unexpected error:", err);
    return { status: "error" };
  }
}

function subjectFor(topic: (typeof TOPIC_OPTIONS)[number], name: string) {
  return `[Anfrage] ${name} — ${topic}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlBody(
  data: {
    name: string;
    email: string;
    phone?: string;
    topic: (typeof TOPIC_OPTIONS)[number];
    urgency: (typeof URGENCY_OPTIONS)[number];
    message: string;
  },
  locale: Locale,
) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6B6660;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;vertical-align:top;">${escapeHtml(
      label,
    )}</td><td style="padding:6px 0;color:#1A1F2E;font-size:14px;">${escapeHtml(value)}</td></tr>`;

  return `
<div style="font-family:Barlow,Helvetica,Arial,sans-serif;color:#1A1F2E;max-width:560px;">
  <h2 style="font-size:18px;margin:0 0 18px;color:#1A1F2E;">Neue Anfrage über daivajankus.de</h2>
  <table style="border-collapse:collapse;width:100%;">
    ${row("Sprache", locale.toUpperCase())}
    ${row("Name", data.name)}
    ${row("E-Mail", data.email)}
    ${row("Telefon", data.phone || "—")}
    ${row("Anliegen", data.topic)}
    ${row("Dringlichkeit", data.urgency)}
  </table>
  <hr style="border:0;border-top:1px solid #E8E2D5;margin:18px 0;">
  <div style="white-space:pre-wrap;font-size:14px;line-height:1.65;">${escapeHtml(
    data.message,
  )}</div>
</div>`.trim();
}

function textBody(
  data: {
    name: string;
    email: string;
    phone?: string;
    topic: (typeof TOPIC_OPTIONS)[number];
    urgency: (typeof URGENCY_OPTIONS)[number];
    message: string;
  },
  locale: Locale,
) {
  return [
    "Neue Anfrage über daivajankus.de",
    "",
    `Sprache: ${locale.toUpperCase()}`,
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    `Anliegen: ${data.topic}`,
    `Dringlichkeit: ${data.urgency}`,
    "",
    "Nachricht:",
    data.message,
  ].join("\n");
}
