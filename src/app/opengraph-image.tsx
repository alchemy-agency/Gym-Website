import { ImageResponse } from "next/og";

export const alt =
  "Sam's Body Shop HB. Private gym and personal training in Huntington Beach.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Palette is duplicated here as literals: `next/og` renders outside the CSS
   pipeline so it cannot read the design tokens. Keep in step with globals.css.
     ink #0c0c0b   bone #ecebe5   bone-2 #a7a59d   bone-3 #85837b
     line #2a2a27  ember #e04a17 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0c0b",
          backgroundImage:
            "radial-gradient(85% 70% at 88% -10%, rgba(224,74,23,0.22) 0%, rgba(12,12,11,0) 62%)",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="26" height="26" viewBox="0 0 32 32">
            <path d="M5 5H19L27 13V27H5V5Z" fill="#e04a17" />
          </svg>
          <div
            style={{
              color: "#ecebe5",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.4,
              textTransform: "uppercase",
            }}
          >
            Sam&apos;s Body Shop
          </div>
          <div style={{ color: "#85837b", fontSize: 22 }}>HB</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ecebe5",
              fontSize: 92,
              lineHeight: 0.92,
              fontWeight: 700,
              letterSpacing: -3.6,
              textTransform: "uppercase",
              maxWidth: 900,
            }}
          >
            Coaching, without the crowd.
          </div>

          <div
            style={{
              color: "#a7a59d",
              fontSize: 30,
              marginTop: 28,
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Private gym and one-to-one personal training. Huntington Beach. The
            first session is free.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2a27",
            paddingTop: 26,
            color: "#85837b",
            fontSize: 22,
          }}
        >
          <div>ACE certified. Owner-operated.</div>
          <div>7351 Autopark Drive</div>
        </div>
      </div>
    ),
    size,
  );
}
