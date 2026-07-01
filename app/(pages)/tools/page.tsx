import type { Metadata } from "next";
import Link from "next/link";
import { ImageIcon, LinkIcon, ArrowRight } from "lucide-react";
import { ResponsiveLeaderboard, NativeAdBanner, SkyscraperRow } from "@/app/components/AdBanner";

export const metadata: Metadata = {
  title: "Free YouTube Tools",
  description: "Free YouTube tools — thumbnail downloader, timestamp link generator and more. No sign-up required.",
};

const TOOLS = [
  {
    href: "/tools/youtube-thumbnail-downloader",
    icon: <ImageIcon className="w-6 h-6 text-red-500" />,
    title: "YouTube Thumbnail Downloader",
    desc: "Download any YouTube video thumbnail in 4 resolutions (maxres, SD, HQ, MQ). One click, no sign-up.",
    badge: "Free",
  },
  {
    href: "/tools/youtube-timestamp-link-generator",
    icon: <LinkIcon className="w-6 h-6 text-red-500" />,
    title: "YouTube Timestamp Link Generator",
    desc: "Generate a shareable YouTube link that starts playing at a specific time (e.g. 1:30, 2:05:10).",
    badge: "Free",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>
            Free YouTube Tools
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            A growing collection of free utilities for YouTube. No account needed.
          </p>
        </div>

        <ResponsiveLeaderboard className="mb-8" />

        <div className="grid sm:grid-cols-2 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card p-6 flex flex-col gap-3 hover:border-red-500/40 hover:shadow-lg transition-all group"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: "color-mix(in srgb, #ef4444 10%, transparent)", border: "1px solid color-mix(in srgb, #ef4444 20%, transparent)" }}>
                  {tool.icon}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "color-mix(in srgb, #22c55e 10%, transparent)", color: "#16a34a", border: "1px solid color-mix(in srgb, #22c55e 20%, transparent)" }}>
                  {tool.badge}
                </span>
              </div>
              <div>
                <h2 className="text-base font-bold mb-1 group-hover:text-red-500 transition-colors" style={{ color: "var(--text)" }}>{tool.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{tool.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-red-500 mt-auto">
                Try it <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <NativeAdBanner className="mt-12" />
        <SkyscraperRow className="mt-8" />
      </div>
    </div>
  );
}
