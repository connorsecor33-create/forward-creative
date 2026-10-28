import { ImageResponse } from "next/og";

export const alt = "Forward Theory — Creative that moves you forward.";
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
          background: "#111111",
          color: "#F2F0EB",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, color: "#858585" }}>
          <span>INDEPENDENT CREATIVE STUDIO</span>
          <span>EST. 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 900, lineHeight: 0.88, letterSpacing: -6 }}>
          <span>WE MAKE</span>
          <span>BRANDS MOVE</span>
          <span style={{ display: "flex" }}>
            FORWARD<span style={{ color: "#D9FF43" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span>Forward Theory</span>
          <span style={{ background: "#D9FF43", color: "#111111", padding: "10px 22px", borderRadius: 999 }}>
            Creative that moves you forward
          </span>
        </div>
      </div>
    ),
    size,
  );
}
