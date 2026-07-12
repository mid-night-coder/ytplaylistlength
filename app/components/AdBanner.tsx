"use client";

import React, { useEffect } from "react";

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
 * Adsterra Referral Banner (728x90)
 */
export function AdsterraReferralBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-4 overflow-hidden ${className}`}>
      <a
        href="https://beta.publishers.adsterra.com/referral/d53jsHkELH"
        rel="nofollow noopener noreferrer"
        target="_blank"
        className="inline-block hover:opacity-95 transition-opacity max-w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="banner"
          src="https://landings-cdn.adsterratech.com/referralBanners/png/728%20x%2090%20px.png"
          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/**
 * Adsterra Referral Banner Group (10 stacked units)
 */
export function AdsterraBannerGroup({ count = 10, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center gap-4 my-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <AdsterraReferralBanner key={idx} />
      ))}
    </div>
  );
}

/**
 * AutoTag Ad Unit (zoneId: wybwhz9au5)
 * Runs directly on the real page DOM so AdCash / aclib domain verification succeeds.
 */
export function AutoTagAdUnit({ className = "" }: { className?: string }) {
  useEffect(() => {
    const runTag = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.aclib && typeof window.aclib.runAutoTag === "function") {
        try {
          // @ts-ignore
          window.aclib.runAutoTag({
            zoneId: "wybwhz9au5",
          });
        } catch (e) {
          console.error("AutoTag error:", e);
        }
      }
    };

    if (!document.getElementById("aclib")) {
      const script = document.createElement("script");
      script.id = "aclib";
      script.type = "text/javascript";
      script.src = "https://acscdn.com/script/aclib.js";
      script.async = true;
      script.onload = () => {
        runTag();
      };
      document.head.appendChild(script);
    } else {
      runTag();
    }
  }, []);

  return (
    <div
      className={`w-full flex justify-center items-center min-h-[60px] my-3 ${className}`}
      data-zone-id="wybwhz9au5"
    />
  );
}

/**
 * AutoTag Banner Group (10 stacked units)
 */
export function AutoTagBannerGroup({ count = 10, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center gap-4 my-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <AutoTagAdUnit key={idx} />
      ))}
    </div>
  );
}

/**
 * All Banners Showcase - 1 of each banner type & size
 */
export function AllBannersShowcase({ className = "" }: { className?: string }) {
  const adsterraLink = "https://beta.publishers.adsterra.com/referral/d53jsHkELH";
  const sizes = [
    { name: "728x90 Leaderboard", src: "https://landings-cdn.adsterratech.com/referralBanners/png/728%20x%2090%20px.png" },
    { name: "468x60 Full Banner", src: "https://landings-cdn.adsterratech.com/referralBanners/png/468%20x%2060%20px.png" },
    { name: "300x250 Medium Rectangle", src: "https://landings-cdn.adsterratech.com/referralBanners/png/300%20x%20250%20px.png" },
    { name: "160x600 Wide Skyscraper", src: "https://landings-cdn.adsterratech.com/referralBanners/png/160%20x%20600%20px.png" },
    { name: "320x50 Mobile Leaderboard", src: "https://landings-cdn.adsterratech.com/referralBanners/png/320%20x%2050%20px.png" },
  ];

  return (
    <div className={`w-full flex flex-col items-center gap-6 my-8 ${className}`}>
      <CoinzUpBanner />
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        {sizes.map((size, index) => (
          <a
            key={index}
            href={adsterraLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-block hover:opacity-95 transition-opacity max-w-full"
            title={size.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={size.name}
              src={size.src}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              loading="lazy"
            />
          </a>
        ))}
      </div>
      <AutoTagAdUnit />
      <NewAdUnit />
    </div>
  );
}

/**
 * High-Density Ad Cluster Block
 * Renders CoinzUpBanner, AdsterraReferralBanner, and 1 NewAdUnit per iteration.
 */
export function AdCluster({ count = 1, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`w-full flex flex-col items-center gap-4 my-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="w-full flex flex-col items-center gap-3 border-y border-[var(--border)] py-4">
          <CoinzUpBanner />
          <AdsterraReferralBanner />
          <NewAdUnit />
        </div>
      ))}
    </div>
  );
}

/**
 * Side Ad Column for Left & Right Page Margins on Desktop
 * Fills the left and right empty spaces with ads from top to bottom (under 50 total limit across site).
 */
export function SideAdColumn({ side = "left", count = 8 }: { side?: "left" | "right"; count?: number }) {
  return (
    <aside
      className={`hidden lg:flex flex-col w-64 xl:w-80 2xl:w-96 shrink-0 px-3 py-6 gap-6 ${
        side === "left" ? "border-r border-[var(--border)]" : "border-l border-[var(--border)]"
      }`}
    >
      <div className="sticky top-20 flex flex-col gap-4 z-10 bg-[var(--bg)]/95 backdrop-blur-sm p-3 rounded-xl border border-[var(--border)] shadow-md">
        <CoinzUpBanner />
        <AdsterraReferralBanner />
        <NewAdUnit />
      </div>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-4 border-b border-[var(--border)] pb-6">
          <CoinzUpBanner />
          <AdsterraReferralBanner />
          <NewAdUnit />
        </div>
      ))}
    </aside>
  );
}
