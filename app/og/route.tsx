import { ImageResponse } from "next/og";
import { getProjectBySlug, siteConfig } from "@/lib/site-content";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const project = slug ? getProjectBySlug(slug) : undefined;
  const title = project?.title ?? siteConfig.name;
  const subtitle =
    project?.excerpt ?? "Brand identity designer based in Peshawar, PK. Strategy, identity, impact.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0E0E0E",
          color: "#D8D8D8"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#6B6B6B",
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase"
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#FF4A4A"
            }}
          />
          Hikmatyar
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 920 }}>
          <div style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: "-0.03em" }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#6B6B6B" }}>{subtitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6B6B6B",
            fontSize: 22
          }}
        >
          <div>Brand Identity / Growth Thinking</div>
          <div>Peshawar, PK</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
