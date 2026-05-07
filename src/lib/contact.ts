import { z } from "zod";

// Hard-coded so callers don't have to pass them — they are public anyway.
export const CONTACT = {
  phone: "+49 173 798 3626",
  phoneTel: "+491737983626",
  email: "daivajankus@t-online.de",
  city: "Mönchengladbach",
  region: "Nordrhein-Westfalen",
  country: "DE",
} as const;

export const TOPIC_OPTIONS = [
  "dolmetschen",
  "uebersetzung",
  "wirtschaft",
  "privat",
  "betreuung",
  "vorschlag",
  "gericht",
  "other",
] as const;

export const URGENCY_OPTIONS = ["standard", "bald", "dringend"] as const;

// One Zod schema, parameterised by locale-specific error messages so the same
// validation runs both client-side (preflight) and server-side (Server Action).
export type ValidationMessages = {
  name: string;
  email: string;
  topic: string;
  message: string;
  consent: string;
};

export function inquirySchema(messages: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(1, messages.name).max(200),
    email: z.string().trim().email(messages.email).max(200),
    phone: z.string().trim().max(80).optional().or(z.literal("")),
    topic: z.enum(TOPIC_OPTIONS, { errorMap: () => ({ message: messages.topic }) }),
    urgency: z.enum(URGENCY_OPTIONS).default("standard"),
    message: z.string().trim().min(5, messages.message).max(5000),
    consent: z.literal("on", { errorMap: () => ({ message: messages.consent }) }),
    // Honeypot — must be empty
    company_url: z.string().max(0).optional().or(z.literal("")),
  });
}

export type InquiryInput = z.infer<ReturnType<typeof inquirySchema>>;
