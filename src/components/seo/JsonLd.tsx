import { CONTACT } from "@/lib/contact";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Daiva Jankus",
      jobTitle: [
        "Vereidigte Dolmetscherin Litauisch–Deutsch",
        "Registrierte Berufsbetreuerin",
      ],
      worksFor: {
        "@type": "LocalBusiness",
        name: "Daiva Jankus",
        address: {
          "@type": "PostalAddress",
          addressLocality: CONTACT.city,
          addressCountry: CONTACT.country,
        },
      },
      knowsLanguage: ["de", "lt", "en"],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Sworn Court Interpreter Lithuanian–German",
          occupationLocation: { "@type": "State", name: "Nordrhein-Westfalen" },
        },
        {
          "@type": "Occupation",
          name: "Professional Legal Guardian (BtOG)",
          occupationLocation: { "@type": "State", name: "Nordrhein-Westfalen" },
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      name: "Daiva Jankus",
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
      },
      telephone: CONTACT.phone,
      email: CONTACT.email,
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
