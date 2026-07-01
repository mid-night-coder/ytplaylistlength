import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { ResponsiveLeaderboard, NativeAdBanner } from "@/app/components/AdBanner";

export const metadata: Metadata = {
  title: "Guides — YouTube Tips & Tutorials",
  description: "Practical guides and tutorials for YouTube watchers. Learn how to watch faster, plan your playlist sessions, and get the most out of YouTube.",
};

const GUIDES = [
  {
    slug: "how-to-watch-youtube-faster",
    title: "How to Watch YouTube Videos Faster Without Missing Anything",
    desc: "A complete guide to using YouTube's playback speed controls to save hours of watch time per week.",
    readTime: "5 min read",
    category: "Tips",
  },
  {
    slug: "how-long-to-finish-a-playlist",
    title: "How Long Does It Take to Finish a YouTube Playlist?",
    desc: "Use our calculator and daily watch plan to find out exactly when you'll finish any playlist.",
    readTime: "3 min read",
    category: "Guide",
  },
  {
    slug: "youtube-keyboard-shortcuts",
    title: "YouTube Keyboard Shortcuts You Need to Know",
    desc: "Speed up, pause, jump ahead — master every YouTube keyboard shortcut to watch more efficiently.",
    readTime: "4 min read",
    category: "Tips",
  },
  {
    slug: "best-youtube-playlists-for-learning",
    title: "Best YouTube Playlists for Learning in 2025",
    desc: "Curated YouTube playlists for programming, mathematics, science, design, and more.",
    readTime: "7 min read",
    category: "Resource",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>Guides</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Practical tips and tutorials for smarter YouTube watching.
          </p>
        </div>

        <ResponsiveLeaderboard className="mb-8" />

        <div className="space-y-4">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="card p-5 flex items-start gap-4 hover:border-red-500/40 transition-all group"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
                style={{ backgroundColor: "color-mix(in srgb, #ef4444 10%, transparent)", border: "1px solid color-mix(in srgb, #ef4444 20%, transparent)" }}>
                <BookOpen className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                    {g.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{g.readTime}</span>
                </div>
                <h2 className="text-base font-bold mb-1 group-hover:text-red-500 transition-colors" style={{ color: "var(--text)" }}>{g.title}</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{g.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 mt-1 group-hover:translate-x-1 transition-transform text-red-500" />
            </Link>
          ))}
        </div>

        <NativeAdBanner className="mt-12" />
      </div>
    </div>
  );
}
