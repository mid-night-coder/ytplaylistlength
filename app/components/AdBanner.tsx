"use client";

import React, { useEffect } from "react";

/**
 * Reusable Iframe-based Ad Banner for Adsterra / HighPerformanceFormat.
 * Isolates document.write() inside a secure srcDoc iframe to prevent React hydration
 * or Next.js layout breakage while keeping the UI completely responsive and smooth.
 */
export function AdBanner({
  adKey,
  width,
  height,
  className = "",
  label = "SPONSORED",
}: {
  adKey: string;
  width: number;
  height: number;
  className?: string;
  label?: string;
}) {
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            overflow: hidden;
            font-family: system-ui, -apple-system, sans-serif;
          }
        </style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex flex-col items-center justify-center my-4 ${className}`}>
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-1.5 opacity-70">
          {label}
        </span>
      )}
      <div
        className="flex justify-center items-center overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-sm max-w-full"
        style={{ minWidth: Math.min(width, 300), minHeight: height }}
      >
        <iframe
          srcDoc={iframeHtml}
          width={width}
          height={height}
          style={{
            border: "none",
            overflow: "hidden",
            background: "transparent",
            maxWidth: "100%",
          }}
          scrolling="no"
          title="Advertisement"
        />
      </div>
    </div>
  );
}

/**
 * Native Banner Ad (EffectiveCPM Network Grid Container: d0b5d02bfc32d5c23e8153591a47ffff)
 */
export function NativeAdBanner({ className = "" }: { className?: string }) {
  useEffect(() => {
    const scriptUrl = "https://pl30154838.effectivecpmnetwork.com/d0b5d02bfc32d5c23e8153591a47ffff/invoke.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`my-8 flex flex-col items-center ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-2 opacity-70">
        RECOMMENDED FOR YOU
      </span>
      <div id="container-d0b5d02bfc32d5c23e8153591a47ffff" className="w-full max-w-4xl overflow-hidden rounded-xl" />
    </div>
  );
}

/**
 * Responsive Leaderboard Banner (728x90 on Desktop: 503c0fb0..., 320x50 on Mobile: 67698b5...)
 */
export function ResponsiveLeaderboard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Desktop Leaderboard (728x90) */}
      <div className="hidden md:block">
        <AdBanner adKey="503c0fb062a034ed1a47294e2e682485" width={728} height={90} />
      </div>
      {/* Mobile Banner (320x50) */}
      <div className="block md:hidden">
        <AdBanner adKey="67698b5dcba67b97e38fe9e41989cd7b" width={320} height={50} />
      </div>
    </div>
  );
}

/**
 * Responsive Rectangle / Banner Ad (468x60 on Desktop: 90eebf9..., 300x250 on Mobile: 74fc2df...)
 */
export function ResponsiveMediumBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="hidden sm:block">
        <AdBanner adKey="90eebf99a9bbc4acafd51df2c39f64d3" width={468} height={60} />
      </div>
      <div className="block sm:hidden">
        <AdBanner adKey="74fc2df7c06064dad45ea308c08f95bf" width={300} height={250} />
      </div>
    </div>
  );
}

/**
 * Skyscraper Row (160x600: dff6b03... and 160x300: 663de48... side-by-side or stacked)
 */
export function SkyscraperRow({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex flex-wrap items-center justify-center gap-6 my-6 ${className}`}>
      <AdBanner adKey="dff6b03a788706efa80ad93ce289d468" width={160} height={600} label="SPONSORED OFFER" />
      <AdBanner adKey="663de48667d588d5a19df42135ac2e08" width={160} height={300} label="PARTNER DEAL" />
    </div>
  );
}

/**
 * Direct monetization link button / banner (Non-intrusive support button)
 */
export function PartnerOfferLink({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-4 ${className}`}>
      <a
        href="https://www.effectivecpmnetwork.com/bsunwhfusi?key=9e7605871eb2024d6538ebe2d5098e5f"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-red-600/10 to-violet-600/10 border border-red-500/20 text-red-400 hover:border-red-500/40 transition-all hover:scale-[1.02]"
      >
        <span>🌟 Sponsor Offer: Check out our featured daily partner</span>
        <span>→</span>
      </a>
    </div>
  );
}
