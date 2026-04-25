/**
 * Sanity Studio — embedded at /studio
 *
 * To activate: run `npm install sanity @sanity/vision` once you have internet access,
 * then uncomment the exports below and remove the placeholder.
 *
 * Sanity Project ID: k27bz9z2  |  Dataset: production
 */

// Uncomment these once `sanity` is installed:
// export { default } from "next-sanity/studio";
// export { metadata, viewport } from "next-sanity/studio";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Hikmatyar",
  robots: { index: false, follow: false }
};

export default function StudioPlaceholderPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0e0e0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
        padding: "48px",
        fontFamily: "sans-serif",
        color: "#d8d8d8"
      }}
    >
      <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b6b" }}>
        CMS
      </p>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 500 }}>Sanity Studio</h1>
      <p style={{ color: "#6b6b6b", maxWidth: "440px", textAlign: "center", lineHeight: 1.7 }}>
        Run <code style={{ background: "#161616", padding: "2px 8px", borderRadius: "2px" }}>npm install sanity @sanity/vision</code> with an active internet connection, then uncomment the exports in <code style={{ background: "#161616", padding: "2px 8px", borderRadius: "2px" }}>app/studio/[[...tool]]/page.tsx</code>.
      </p>
      <a
        href="https://sanity.io/manage"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#ff4a4a", fontSize: "14px", marginTop: "8px" }}
      >
        Open Sanity Dashboard ↗
      </a>
    </main>
  );
}
