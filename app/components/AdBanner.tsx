"use client";

import React, { useEffect, useState } from "react";

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
 * Ads-Bitcoin Ad Unit (rcd: MjE3MA==) - Strictly 1 instance across site
 */
export function AdsBitcoinBanner({ className = "" }: { className?: string }) {
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
        <script type="text/javascript" src="https://ads-bitcoin.com/app/codes/zone?rcd=MjE3MA=="></script>
      </body>
    </html>
  `;

  return (
    <div className={`w-full flex justify-center my-4 overflow-hidden ${className}`}>
      <iframe
        srcDoc={iframeHtml}
        style={{ width: "100%", minHeight: "90px", border: "none", overflow: "hidden" }}
        scrolling="no"
        title="Ads Bitcoin Sponsored Banner"
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

/**
 * RollerCoin Affiliate Banner (120x240)
 */
export function RollerCoinBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center my-3 overflow-hidden ${className}`}>
      {/*Start rollercoin.com code*/}
      <a
        href="https://rollercoin.com/?r=ltu9svtd"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block hover:opacity-95 transition-opacity"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://static.rollercoin.com/static/img/ref/gen2/w120h240.gif"
          alt="120h240"
          className="rounded shadow-md mx-auto"
          loading="lazy"
        />
      </a>
      {/*End rollercoin.com code*/}
    </div>
  );
}

/**
 * A-ADS Sticky Bottom Bar Ad Unit (2447720) - Strictly 1 across website
 */
export function AAdsStickyBottomBanner() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99999, width: "100%" }}>
      <div style={{ width: "100%", height: "auto", position: "relative", textAlign: "center", margin: "auto" }}>
        <button
          type="button"
          onClick={() => setClosed(true)}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            right: "24px",
            position: "absolute",
            borderRadius: "4px",
            background: "rgba(248, 248, 249, 0.85)",
            padding: "4px",
            zIndex: 99999,
            cursor: "pointer",
            border: "1px solid #ccc",
          }}
          aria-label="Close Ad"
        >
          <svg fill="#000000" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
          </svg>
        </button>
        <div id="frame" style={{ width: "100%", margin: "auto", position: "relative", zIndex: 99998 }}>
          <iframe
            data-aa="2447720"
            src="https://acceptable.a-ads.com/2447720/?size=Adaptive"
            style={{
              border: 0,
              padding: 0,
              width: "70%",
              minHeight: "90px",
              height: "auto",
              overflow: "hidden",
              margin: "auto",
              display: "block",
            }}
            title="A-ADS Sticky Bottom Unit"
          />
        </div>
      </div>
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
 * CoinzUp PTP Small Window Player (Floating widget on home screen)
 * Plays CoinzUp PTP ads continuously: https://coinzup.net/ptp?ptp_code=2vd2WyMDYu
 */
export function CoinzUpPtpWindow() {
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden w-80 sm:w-88 transition-all duration-300">
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium text-[var(--text)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sponsored Ad Viewer</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1 hover:bg-[var(--border)] rounded text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            title={minimized ? "Expand" : "Minimize"}
            aria-label={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? "□" : "—"}
          </button>
          <button
            onClick={() => setClosed(true)}
            className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded text-[var(--text-muted)] transition-colors"
            title="Close"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="relative w-full h-48 sm:h-56 bg-black overflow-hidden">
          <iframe
            src="https://coinzup.net/ptp?ptp_code=2vd2WyMDYu"
            className="w-full h-full border-none"
            allow="autoplay"
            title="CoinzUp PTP Ad Player"
          />
        </div>
      )}
    </div>
  );
}

/**
 * CoinzUp PTP Embedded Small Window Card
 */
export function CoinzUpPtpCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-sm mx-auto my-4 flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>CoinzUp PTP Live Ad Window</span>
        </div>
        <span className="text-[var(--text-muted)] text-[10px]">SPONSORED</span>
      </div>
      <div className="w-full h-52 bg-black overflow-hidden">
        <iframe
          src="https://coinzup.net/ptp?ptp_code=2vd2WyMDYu"
          className="w-full h-full border-none"
          allow="autoplay"
          title="CoinzUp PTP Embedded Player"
        />
      </div>
    </div>
  );
}

/**
 * EffectiveCPM Direct Ad Small Window Player (Floating widget at bottom-left on home screen)
 * Plays EffectiveCPM Direct Link ads continuously:
 * https://www.effectivecpmnetwork.com/kh93gt180?key=0b1d5f8707dfea3c2e2677736ba311b8
 */
export function EffectiveCpmWindow() {
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden w-80 sm:w-88 transition-all duration-300">
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium text-[var(--text)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Partner Ad Viewer</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1 hover:bg-[var(--border)] rounded text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            title={minimized ? "Expand" : "Minimize"}
            aria-label={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? "□" : "—"}
          </button>
          <button
            onClick={() => setClosed(true)}
            className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded text-[var(--text-muted)] transition-colors"
            title="Close"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="relative w-full h-48 sm:h-56 bg-black overflow-hidden">
          <iframe
            src="https://www.effectivecpmnetwork.com/kh93gt180?key=0b1d5f8707dfea3c2e2677736ba311b8"
            className="w-full h-full border-none"
            allow="autoplay"
            title="Partner Direct Ad Player"
          />
        </div>
      )}
    </div>
  );
}

/**
 * EffectiveCPM Embedded Small Window Card
 */
export function EffectiveCpmCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-sm mx-auto my-4 flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Partner Direct Live Window</span>
        </div>
        <span className="text-[var(--text-muted)] text-[10px]">SPONSORED</span>
      </div>
      <div className="w-full h-52 bg-black overflow-hidden">
        <iframe
          src="https://www.effectivecpmnetwork.com/kh93gt180?key=0b1d5f8707dfea3c2e2677736ba311b8"
          className="w-full h-full border-none"
          allow="autoplay"
          title="Partner Direct Embedded Player"
        />
      </div>
    </div>
  );
}

/**
 * 10 Small Windows on the Home Screen playing EffectiveCPM ads (5 of each URL)
 */
export function EffectiveCpmMultiWindows({ className = "" }: { className?: string }) {
  const url1 = "https://www.effectivecpmnetwork.com/kh93gt180?key=0b1d5f8707dfea3c2e2677736ba311b8";
  const url2 = "https://www.effectivecpmnetwork.com/y1nwwfp0z5?key=d2c3671cb51d0e2bb874c70f10f35f9c";

  const windows = [
    ...Array.from({ length: 5 }).map((_, i) => ({
      id: `cpm-1-${i + 1}`,
      title: `Partner Stream #1 - Window ${i + 1}`,
      url: url1,
      color: "bg-blue-500",
    })),
    ...Array.from({ length: 5 }).map((_, i) => ({
      id: `cpm-2-${i + 1}`,
      title: `Partner Stream #2 - Window ${i + 1}`,
      url: url2,
      color: "bg-purple-500",
    })),
  ];

  return (
    <div className={`w-full my-6 ${className}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-[var(--text)]">Live Sponsored Streams (Multi-Window Player)</h3>
        </div>
        <span className="text-xs text-[var(--text-muted)] font-mono">10 ACTIVE WINDOWS</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {windows.map((win) => (
          <div
            key={win.id}
            className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-[var(--text)] truncate">{win.title}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${win.color} animate-ping`} />
                <span className="text-[10px] font-bold tracking-wider text-[var(--text-muted)]">PLAYING</span>
              </div>
            </div>
            <div className="w-full h-44 bg-black overflow-hidden relative">
              <iframe
                src={win.url}
                className="w-full h-full border-none"
                allow="autoplay"
                title={win.title}
              />
            </div>
          </div>
        ))}
      </div>
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
      <EffectiveCpmCard />
      <AutoTagAdUnit />
    </div>
  );
}

/**
 * High-Density Ad Cluster Block (disabled so script ads total exactly 10)
 */
export function AdCluster({ count = 1, className = "" }: { count?: number; className?: string }) {
  void count;
  void className;
  return null;
}

/**
 * Side Ad Column for Left & Right Page Margins on Desktop (disabled so script ads total exactly 10)
 */
export function SideAdColumn({ side = "left", count = 35 }: { side?: "left" | "right"; count?: number }) {
  void side;
  void count;
  return null;
}

/**
 * EffectiveCPM Script Ad Wall (Exactly 100 units across site)
 * Renders exactly 100 NewAdUnit instances (script: 4ea29356f9e54b45aaabfa3362084c1a.js)
 */
export function EffectiveCpmScriptAdWall({ count = 100, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`w-full my-6 flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between px-2 border-b border-[var(--border)] pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Sponsored Network Feed ({count} Active Ad Units)
        </span>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-mono">
          ACTIVE
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-2 shadow-sm">
            <NewAdUnit />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Affiliate Banners Quad Block (Exactly 4 of each: CoinzUp, RollerCoin, Adsterra)
 */
export function AffiliateBannersQuad({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full my-6 flex flex-col gap-6 ${className}`}>
      {/* Exactly 4 CoinzUp Animated Banners */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-1">
          CoinzUp Sponsored Banners (4 Active)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <CoinzUpBanner key={`coinzup-${idx}`} className="!my-0" />
          ))}
        </div>
      </div>

      {/* Exactly 4 RollerCoin Affiliate Banners */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-1">
          RollerCoin Partner Banners (4 Active)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <RollerCoinBanner key={`rollercoin-${idx}`} className="!my-0" />
          ))}
        </div>
      </div>

      {/* Exactly 4 Adsterra Referral Banners */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-1">
          Adsterra Publisher Banners (4 Active)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <AdsterraReferralBanner key={`adsterra-${idx}`} className="!my-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CryptoTab Browser Affiliate Skyscraper (120x600)
 */
export function CryptoTabSkyscraper({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center my-2 overflow-hidden ${className}`}>
      <a
        href="https://cryptotabbrowser.com/landing/80/25127157"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block hover:opacity-95 transition-opacity"
        style={{ display: "block", width: "120px", height: "auto", maxWidth: "100%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.cryptobrowser.store/media/pb/503/98d5c6bca1f34d5c957b0f61e48e4e43.jpg"
          srcSet="https://cdn.cryptobrowser.store/media/pb/503/eb3a62f3076e4b6ab9ee054b3b932ac4.jpg 2x"
          alt="CryptoTab Browser 120x600 Banner"
          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/**
 * CryptoTab Browser Affiliate Square Banner (250x250)
 */
export function CryptoTabSquare({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center my-2 overflow-hidden ${className}`}>
      <a
        href="https://cryptotabbrowser.com/landing/80/25127157"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block hover:opacity-95 transition-opacity"
        style={{ display: "block", width: "250px", height: "auto", maxWidth: "100%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.cryptobrowser.store/media/pb/503/98d5c6bca1f34d5c957b0f61e48e4e43.jpg"
          srcSet="https://cdn.cryptobrowser.store/media/pb/503/eb3a62f3076e4b6ab9ee054b3b932ac4.jpg 2x"
          alt="CryptoTab Browser 250x250 Banner"
          className="w-full h-auto rounded-lg shadow-md mx-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/**
 * CryptoTab Showcase Section (Exactly 2 Skyscrapers + Exactly 2 Square Banners)
 */
export function CryptoTabShowcase({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full my-6 flex flex-col gap-6 ${className}`}>
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-1">
          CryptoTab Browser Sponsored Banners (2 Skyscrapers &amp; 2 Squares Active)
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <CryptoTabSkyscraper />
          <CryptoTabSquare />
          <CryptoTabSquare />
          <CryptoTabSkyscraper />
        </div>
      </div>
    </div>
  );
}

/**
 * 10 New Small Windows opening https://ytplaylistlengthcal.vercel.app/
 */
export function VercelSiteMultiWindows({ className = "" }: { className?: string }) {
  const targetUrl = "https://ytplaylistlengthcal.vercel.app/";

  const windows = Array.from({ length: 10 }).map((_, idx) => ({
    id: `vercel-win-${idx + 1}`,
    title: `App Window #${idx + 1} - ytplaylistlengthcal`,
    url: targetUrl,
  }));

  return (
    <div className={`w-full my-6 ${className}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-[var(--text)]">Site Multi-Window Preview (10 Windows)</h3>
        </div>
        <span className="text-xs text-[var(--text-muted)] font-mono">10 ACTIVE WINDOWS</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {windows.map((win) => (
          <div
            key={win.id}
            className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg)] border-b border-[var(--border)] text-xs font-medium">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-[var(--text)] truncate">{win.title}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={win.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 px-2 py-0.5 rounded font-mono transition-colors"
                >
                  OPEN EXTERNAL ↗
                </a>
              </div>
            </div>
            <div className="w-full h-48 bg-[var(--bg)] overflow-hidden relative">
              <iframe
                src={win.url}
                className="w-full h-full border-none"
                title={win.title}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
