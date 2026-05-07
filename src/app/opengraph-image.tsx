import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daiva Jankus — Vereidigte Dolmetscherin & Berufsbetreuerin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FAF7F2";
const AMBER = "#C8923D";
const INK = "#1A1F2E";
const MUTED = "#6B6660";
const RULE = "#E8E2D5";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: "72px 96px",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: INK,
        }}
      >
        {/* Top row — DJ mark + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 88,
              height: 88,
              background: AMBER,
              color: PAPER,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            DJ
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: MUTED,
              display: "flex",
            }}
          >
            OLG Düsseldorf · BtOG-Registrierung
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Main wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 600,
              letterSpacing: "-3px",
              lineHeight: 1.02,
              display: "flex",
            }}
          >
            Daiva Jankus
          </div>
          <div
            style={{
              fontSize: 32,
              color: INK,
              lineHeight: 1.3,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Vereidigte Dolmetscherin Litauisch–Deutsch · Registrierte
            Berufsbetreuerin
          </div>
        </div>

        {/* Bottom row — divider + location */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: MUTED,
              letterSpacing: "1px",
              display: "flex",
            }}
          >
            Mönchengladbach · Nordrhein-Westfalen
          </div>
          <div
            style={{
              fontSize: 22,
              color: AMBER,
              letterSpacing: "3px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            DE · EN · LT
          </div>
        </div>
      </div>
    ),
    size,
  );
}
