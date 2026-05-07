/**
 * Inlines a JSON-LD `<script>` tag. Pass any plain object (or array of objects)
 * — see lib/seo.ts for builders covering Person, LocalBusiness, Breadcrumb,
 * FAQPage, LegalService, ProfessionalService, ProfilePage, ContactPage.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((entry, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
