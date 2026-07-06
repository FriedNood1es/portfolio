import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { identity, projects, type ProjectStatus } from "@/lib/content";

export const dynamic = "force-static";
export const alt = `${identity.name} — ${identity.headline}, ${identity.headlineQualifier}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  bg: "#0d1117",
  bgRaised: "#151b23",
  ink: "#dbe4ee",
  inkDim: "#94a2b3",
  inkFaint: "#5b6673",
  accent: "#6cc7e6",
  ok: "#7ee2a8",
  warn: "#e6b566",
  line: "#232c37",
};

const statusStyle: Record<ProjectStatus, { text: string; color: string }> = {
  shipped: { text: "[shipped]", color: colors.ok },
  "in-progress": { text: "[in progress]", color: colors.warn },
  planned: { text: "[planned]", color: colors.inkFaint },
};

export default async function Image() {
  const [display, bodyRegular, bodyBold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/MartianMono-ExtraBold.woff")),
    readFile(join(process.cwd(), "assets/fonts/SometypeMono-Regular.woff")),
    readFile(join(process.cwd(), "assets/fonts/SometypeMono-Bold.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.bg,
          fontFamily: "Sometype Mono",
          padding: 44,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: colors.bgRaised,
            border: `1px solid ${colors.line}`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 28px",
              borderBottom: `1px solid ${colors.line}`,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 7,
                border: `1.5px solid ${colors.line}`,
              }}
            />
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 7,
                border: `1.5px solid ${colors.line}`,
                marginLeft: 10,
              }}
            />
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 7,
                border: `1.5px solid ${colors.line}`,
                marginLeft: 10,
              }}
            />
            <div style={{ display: "flex", marginLeft: 14, fontSize: 16, color: colors.inkFaint }}>
              kent@davao: ~
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 64px",
            }}
          >
            <div style={{ display: "flex", fontSize: 22 }}>
              <span style={{ color: colors.accent, fontWeight: 700, marginRight: 12 }}>$</span>
              <span style={{ color: colors.inkDim }}>whoami</span>
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Martian Mono",
                fontWeight: 800,
                fontSize: 76,
                color: colors.ink,
                marginTop: 20,
                letterSpacing: -2,
              }}
            >
              {identity.name}
            </div>

            <div
              style={{
                display: "flex",
                fontWeight: 700,
                fontSize: 34,
                color: colors.accent,
                marginTop: 8,
              }}
            >
              {identity.headline} — {identity.headlineQualifier}
            </div>

            <div style={{ display: "flex", fontSize: 22, marginTop: 46 }}>
              <span style={{ color: colors.accent, fontWeight: 700, marginRight: 12 }}>$</span>
              <span style={{ color: colors.inkDim }}>ls projects/ --status</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 18, gap: 12 }}>
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.slug}
                  style={{ display: "flex", alignItems: "baseline", fontSize: 20 }}
                >
                  <span style={{ color: colors.accent }}>{p.slug}/</span>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      borderBottom: `2px dashed ${colors.inkFaint}`,
                      margin: "0 14px",
                      height: 1,
                    }}
                  />
                  <span style={{ color: statusStyle[p.status].color }}>
                    {statusStyle[p.status].text}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", fontSize: 22, marginTop: 42, alignItems: "center" }}>
              <span style={{ color: colors.accent, fontWeight: 700, marginRight: 12 }}>$</span>
              <div style={{ display: "flex", width: 14, height: 26, background: colors.accent }} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 28px 22px",
              fontSize: 16,
              color: colors.inkFaint,
            }}
          >
            {identity.site}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Martian Mono", data: display, weight: 800, style: "normal" },
        { name: "Sometype Mono", data: bodyRegular, weight: 400, style: "normal" },
        { name: "Sometype Mono", data: bodyBold, weight: 700, style: "normal" },
      ],
    },
  );
}
