"use client";

import React from "react";

/**
 * Requested External Script Ad Unit:
 * <script src="https://pl30154839.effectivecpmnetwork.com/4e/a2/93/4ea29356f9e54b45aaabfa3362084c1a.js"></script>
 * Safely isolated via iframe srcDoc to prevent React hydration or DOM conflicts.
 */
export function NewAdUnit({ className = "" }: { className?: string }) {
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
          }
        </style>
      </head>
      <body>
        <script src="https://pl30154839.effectivecpmnetwork.com/4e/a2/93/4ea29356f9e54b45aaabfa3362084c1a.js"></script>
      </body>
    </html>
  `;

  return (
    <div className={`w-full flex justify-center my-2 ${className}`}>
      <iframe
        srcDoc={iframeHtml}
        style={{ width: "100%", minHeight: "75px", border: "none", overflow: "hidden" }}
        scrolling="no"
        title="Sponsored Advertisement"
      />
    </div>
  );
}

/**
 * CoinzUp Banner Unit (Kept as requested!)
 */
export function CoinzUpBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-4 overflow-hidden ${className}`}>
      <a
        href="https://coinzup.net/api/click/banner/2vd2WyMDYu"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-95 transition-opacity max-w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://coinzup.net/api/banner/2vd2WyMDYu/banner.gif"
          alt="CoinzUp Banner"
          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  return <NewAdUnit className={className} />;
}

export function NativeAdBanner({ className = "" }: { className?: string }) {
  return <NewAdUnit className={className} />;
}

export function ResponsiveLeaderboard({ className = "" }: { className?: string }) {
  return <NewAdUnit className={className} />;
}

export function ResponsiveMediumBanner({ className = "" }: { className?: string }) {
  return <NewAdUnit className={className} />;
}

export function SkyscraperRow({ className = "" }: { className?: string }) {
  return <NewAdUnit className={className} />;
}

export function PartnerOfferLink({ className = "" }: { className?: string }) {
  void className;
  return null;
}

/**
 * High-Density Ad Cluster Block
 * Each iteration renders CoinzUpBanner alongside 5 NewAdUnit instances,
 * ensuring over 200 requested ad units across the home page while keeping CoinzUp ads intact.
 */
export function AdCluster({ count = 2, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center gap-4 my-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="w-full flex flex-col items-center gap-3 border-y border-[var(--border)] py-4">
          <CoinzUpBanner />
          <NewAdUnit />
          <NewAdUnit />
          <NewAdUnit />
          <NewAdUnit />
          <NewAdUnit />
          <CoinzUpBanner />
        </div>
      ))}
    </div>
  );
}

/**
 * Side Ad Column for Left & Right Page Margins on Desktop
 * Fills the left and right empty spaces with ads from top to bottom.
 */
export function SideAdColumn({ side = "left", count = 14 }: { side?: "left" | "right"; count?: number }) {
  return (
    <aside
      className={`hidden lg:flex flex-col w-64 xl:w-80 2xl:w-96 shrink-0 px-3 py-6 gap-6 ${
        side === "left" ? "border-r border-[var(--border)]" : "border-l border-[var(--border)]"
      }`}
    >
      <div className="sticky top-20 flex flex-col gap-4 z-10 bg-[var(--bg)]/95 backdrop-blur-sm p-3 rounded-xl border border-[var(--border)] shadow-md">
        <CoinzUpBanner />
        <NewAdUnit />
        <NewAdUnit />
      </div>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-4 border-b border-[var(--border)] pb-6">
          <CoinzUpBanner />
          <NewAdUnit />
          <NewAdUnit />
          <NewAdUnit />
        </div>
      ))}
    </aside>
  );
}
