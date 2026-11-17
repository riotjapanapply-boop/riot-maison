import { ImageResponse } from "next/og";

export const alt = "RIOT MAISON — Japan's Finest Wellness & Lifestyle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B241E",
          color: "#E2E2DF",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          RIOT MAISON
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#BBA57B",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Japan — Finest Wellness &amp; Lifestyle
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "rgba(226,226,223,0.65)",
          }}
        >
          Kuratiert · Nur Japan · Für die deutschsprachige Welt
        </div>
      </div>
    ),
    { ...size },
  );
}
