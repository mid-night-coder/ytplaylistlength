import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ResponsiveMediumBanner, NativeAdBanner } from "@/app/components/AdBanner";

const GUIDES: Record<string, { title: string; desc: string; readTime: string; content: string }> = {
  "how-to-watch-youtube-faster": {
    title: "How to Watch YouTube Videos Faster Without Missing Anything",
    desc: "A complete guide to using YouTube's playback speed controls to save hours of watch time per week.",
    readTime: "5 min read",
    content: `## Why Watch at a Higher Speed?

The average YouTube video is watched at 1× speed. But most content — especially tutorials, lectures, and podcasts — is perfectly understandable at 1.25× or even 1.5× speed.

At 1.5× speed, a 10-hour playlist takes only **6 hours and 40 minutes**. That's 3 hours and 20 minutes saved.

## How to Change YouTube Playback Speed

1. Click the **Settings (⚙️) gear icon** at the bottom right of any video
2. Click **Playback speed**
3. Choose from 0.25× to 2×

**Keyboard shortcut:** Press **Shift + >** to increase speed, **Shift + <** to decrease.

## Recommended Speeds by Content Type

| Content Type | Recommended Speed |
|---|---|
| Fast-paced tutorials | 1× – 1.25× |
| Lectures / talks | 1.25× – 1.5× |
| Podcasts / interviews | 1.5× – 1.75× |
| Review content | 1.5× – 2× |
| Entertainment | 1× (don't rush enjoyment!) |

## Use Our Calculator to Plan Ahead

Paste any playlist URL into our [YouTube Playlist Length Calculator](/) to see exactly how long you'll spend watching at each speed before you start.`,
  },
  "how-long-to-finish-a-playlist": {
    title: "How Long Does It Take to Finish a YouTube Playlist?",
    desc: "Use our calculator and daily watch plan to find out exactly when you'll finish any playlist.",
    readTime: "3 min read",
    content: `## The Problem with Long Playlists

YouTube playlists can range from a handful of videos to thousands. Without knowing the total duration, it's impossible to plan when you'll finish.

## Step-by-Step: Calculate Your Finish Date

1. **Copy your playlist URL** from YouTube
2. **Paste it into our [calculator](/)** and click Calculate
3. In the **Daily Watch Plan** section, set how many minutes per day you watch
4. Set your preferred **playback speed**
5. The calculator shows you the **exact date** you'll finish!

## Tips to Finish Faster

- **Watch at 1.5×** — you finish 33% faster
- **Set a daily goal** — even 30 minutes/day adds up
- **Use the Remaining mode** — after catching up to a certain video, recalculate only what's left
- **Remove watched videos** from your playlist so the count stays accurate`,
  },
  "youtube-keyboard-shortcuts": {
    title: "YouTube Keyboard Shortcuts You Need to Know",
    desc: "Speed up, pause, jump ahead — master every YouTube keyboard shortcut.",
    readTime: "4 min read",
    content: `## Essential YouTube Keyboard Shortcuts

| Key | Action |
|---|---|
| **Space** or **K** | Play / Pause |
| **→** | Jump forward 5 seconds |
| **←** | Jump back 5 seconds |
| **J** | Jump back 10 seconds |
| **L** | Jump forward 10 seconds |
| **0–9** | Jump to 0%–90% of video |
| **F** | Toggle fullscreen |
| **M** | Mute / Unmute |
| **C** | Toggle closed captions |
| **Shift + >** | Increase playback speed |
| **Shift + <** | Decrease playback speed |
| **T** | Theater mode |
| **I** | Mini-player mode |
| **Esc** | Exit fullscreen / mini-player |

## Speed Tips

Press **Shift + >** twice to jump from 1× to 1.5× speed instantly. Press it again for 2×.

To go back to normal, press **Shift + <** until you see 1×.`,
  },
  "best-youtube-playlists-for-learning": {
    title: "Best YouTube Playlists for Learning in 2025",
    desc: "Curated YouTube playlists for programming, mathematics, science, design, and more.",
    readTime: "7 min read",
    content: `## Programming

- **freeCodeCamp** — Full courses on Python, JavaScript, React, and more
- **The Coding Train** — Creative coding with p5.js and JavaScript
- **Fireship** — Fast-paced modern web dev tutorials

## Mathematics

- **3Blue1Brown** — Visual, intuitive math (Essence of Linear Algebra, Calculus)
- **Khan Academy** — Comprehensive K–college math curriculum

## Science

- **Kurzgesagt** — Animated science and philosophy
- **Veritasium** — Physics, engineering, and curiosity-driven science
- **Mark Rober** — Science and engineering experiments

## Design & Creativity

- **The Futur** — Brand design, business of design
- **Flux** — UX/UI design for beginners and pros
- **AdobeCreativeCloud** — Official Photoshop, Illustrator tutorials

## How to Calculate Your Study Time

Use our [Playlist Calculator](/) to find out exactly how long each of these playlists is, and build a study schedule using the Daily Watch Plan feature.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return {};
  return { title: guide.title, description: guide.desc };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [head, , ...body] = tableRows;
      elements.push(
        <div key={elements.length} className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {head.filter(Boolean).map((c, i) => (
                  <th key={i} className="px-4 py-2 text-left font-semibold text-xs uppercase border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>{c.replace(/\*\*/g, "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.filter(Boolean).map((c, ci) => (
                    <td key={ci} className="px-4 py-2 border" style={{ borderColor: "var(--border)", color: "var(--text)" }}
                      dangerouslySetInnerHTML={{ __html: c.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("|")) {
      inTable = true;
      tableRows.push(line.split("|").slice(1, -1).map((c) => c.trim()));
      return;
    }
    if (inTable) flushTable();

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--text)" }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("- **")) {
      const m = line.match(/- \*\*([^*]+)\*\* — (.*)/);
      if (m) {
        elements.push(
          <li key={i} className="mb-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>{m[1]}</strong> — {m[2]}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(<li key={i} className="mb-1 text-sm" style={{ color: "var(--text-muted)" }}>{line.slice(2)}</li>);
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-sm leading-7 mb-4" style={{ color: "var(--text-muted)" }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text)">$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-red-500 hover:underline">$1</a>') }}
        />
      );
    }
  });
  if (inTable) flushTable();
  return elements;
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Link href="/guides" className="flex items-center gap-2 text-sm mb-6 hover:text-red-500 transition-colors" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>

        <header className="mb-8">
          <p className="text-xs mb-2" style={{ color: "var(--text-subtle)" }}>{guide.readTime}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight" style={{ color: "var(--text)" }}>
            {guide.title}
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{guide.desc}</p>
        </header>

        <ResponsiveMediumBanner className="my-6" />

        <article className="prose-custom">
          {renderMarkdown(guide.content)}
        </article>

        <NativeAdBanner className="mt-8" />

        <div className="mt-10 p-5 rounded-xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Try the Calculator</p>
          <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Calculate total playlist length and build your daily watch plan.</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm">
            Open Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
