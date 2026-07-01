"use client";
import { useState } from "react";
import { Link2, Copy, Check, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { ResponsiveLeaderboard, ResponsiveMediumBanner, NativeAdBanner, PartnerOfferLink } from "@/app/components/AdBanner";

function extractVideoId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  return null;
}

function toSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s;
}

export default function TimestampGenerator() {
  const [url, setUrl] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const videoId = extractVideoId(url.trim());
  const totalSec = toSeconds(hours, minutes, seconds);
  const generatedUrl = videoId ? `https://youtu.be/${videoId}?t=${totalSec}` : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?start=${totalSec}` : null;

  const validate = () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL."); return false; }
    if (!videoId) { setError("Could not find a video ID in this URL."); return false; }
    setError("");
    return true;
  };

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmtTime = (h: number, m: number, s: number) =>
    [h > 0 ? h : null, String(m).padStart(h > 0 ? 2 : 1, "0"), String(s).padStart(2, "0")]
      .filter(Boolean).join(":");

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "color-mix(in srgb, #22c55e 10%, transparent)", border: "1px solid color-mix(in srgb, #22c55e 25%, transparent)", color: "#16a34a" }}>
            Free · Instant
          </span>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>
            YouTube Timestamp Link Generator
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Create a YouTube link that starts at a specific time. Share it with anyone — no sign-up needed.
          </p>
        </div>

        <div className="card p-6 mb-4" style={{ backgroundColor: "var(--bg-card)" }}>
          {/* Video URL */}
          <div className="mb-5">
            <label htmlFor="ts-url" className="label-text mb-2 block">YouTube Video URL</label>
            <input
              id="ts-url"
              type="url"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(""); }}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="input-base w-full px-4 py-3 text-sm"
              style={{ color: "var(--text)" }}
            />
            {videoId && (
              <p className="mt-1.5 text-xs flex items-center gap-1 text-green-500">
                <CheckCircle2 className="w-3 h-3" /> Video ID detected: <code className="font-mono bg-green-500/10 px-1 rounded">{videoId}</code>
              </p>
            )}
          </div>

          {/* Time inputs */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Hours", val: hours, set: setHours, max: 99 },
              { label: "Minutes", val: minutes, set: setMinutes, max: 59 },
              { label: "Seconds", val: seconds, set: setSeconds, max: 59 },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs mb-1.5 block font-medium" style={{ color: "var(--text-muted)" }}>{field.label}</label>
                <input
                  type="number"
                  min={0}
                  max={field.max}
                  value={field.val || ""}
                  onChange={(e) => field.set(Math.max(0, Math.min(field.max, parseInt(e.target.value) || 0)))}
                  placeholder="0"
                  className="input-base w-full px-3 py-2.5 text-center text-base font-mono font-semibold"
                  style={{ color: "var(--text)" }}
                />
              </div>
            ))}
          </div>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className="text-xs self-center mr-1" style={{ color: "var(--text-subtle)" }}>Quick add:</span>
            {[
              { label: "+30s", s: 30 },
              { label: "+1m", s: 60 },
              { label: "+5m", s: 300 },
              { label: "+10m", s: 600 },
              { label: "+1h", s: 3600 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  const newTotal = totalSec + p.s;
                  setHours(Math.floor(newTotal / 3600));
                  setMinutes(Math.floor((newTotal % 3600) / 60));
                  setSeconds(newTotal % 60);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--bg-hover)]"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                {p.label}
              </button>
            ))}
            {totalSec > 0 && (
              <button
                type="button"
                onClick={() => { setHours(0); setMinutes(0); setSeconds(0); }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 ml-auto transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <button onClick={validate} className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
            <Link2 className="w-4 h-4" /> Generate Timestamp Links
          </button>
        </div>

        {/* Results */}
        {generatedUrl && (
          <div className="card p-6 animate-fade-slide" style={{ backgroundColor: "var(--bg-card)" }}>
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-1.5" style={{ color: "var(--text)" }}>
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Your Links are Ready
            </h2>

            {[
              { label: "Shareable Link (starts at " + (hours ? `${hours}h ` : "") + (minutes ? `${minutes}m ` : "") + `${seconds}s)`, value: generatedUrl },
              { label: "Embed URL", value: embedUrl! },
            ].map((item) => (
              <div key={item.label} className="mb-4 last:mb-0">
                <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>{item.label}</label>
                <div className="flex items-center gap-2">
                  <code
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-mono truncate"
                    style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text)" }}
                  >
                    {item.value}
                  </code>
                  <button
                    onClick={() => copy(item.value)}
                    className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            ))}

            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <ExternalLink className="w-4 h-4" /> Test link in new tab
            </a>
          </div>
        )}

        <ResponsiveMediumBanner className="mt-8" />
        <PartnerOfferLink />
        <NativeAdBanner className="mt-10" />
      </div>
    </div>
  );
}
