import { ImageResponse } from "next/og";

export const alt = "Smart Appliance Services: appliance repair in DC, Maryland and Northern Virginia";
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #050b16 0%, #0a1e42 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 34, color: "#67e8f9", fontWeight: 700 }}>Smart Appliance Services</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 20 }}>
          Appliance Repair in DC, MD &amp; Northern VA
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1", marginTop: 32 }}>
          $89 diagnostic credited toward repair · 30-day warranty
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 40 }}>(571) 459-8155</div>
      </div>
    ),
    { ...size },
  );
}
