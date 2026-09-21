import { ImageResponse } from "next/og";

export const alt =
  "Sam's Body Shop HB. Private gym and personal training in Huntington Beach.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#0a0b0a",
          backgroundImage:
            "radial-gradient(120% 80% at 84% -8%, #1b4733 0%, rgba(10,11,10,0) 62%)",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, backgroundColor: "#e04a17" }} />
          <div
            style={{
              color: "#eae8e1",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.4,
              textTransform: "uppercase",
            }}
          >
            Sam&apos;s Body Shop
          </div>
          <div style={{ color: "#83887c", fontSize: 22 }}>HB</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#eae8e1",
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
              color: "#a5a79c",
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
            borderTop: "1px solid #262b25",
            paddingTop: 26,
            color: "#83887c",
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
