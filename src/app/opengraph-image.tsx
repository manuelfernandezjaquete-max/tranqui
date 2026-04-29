import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tranqui — Asistente Veterinario IA 24/7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f1e8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Brand wordmark */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#5c6f62",
            letterSpacing: "-1px",
            marginBottom: 24,
          }}
        >
          Tranqui
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#2c2a26",
            maxWidth: 700,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Asistente veterinario IA 24/7 para dueños de perros y gatos
        </div>

        {/* Three value props */}
        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          {["Triage clínico", "Videoconsulta", "Respuesta en 3 min"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "#dde5e0",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 18,
                  color: "#5c6f62",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 20,
            color: "#6b6862",
          }}
        >
          tranqui.app
        </div>
      </div>
    ),
    { ...size },
  );
}
