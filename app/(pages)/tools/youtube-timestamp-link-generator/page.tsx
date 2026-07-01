"use client";
import { useState } from "react";
import { Link2, Copy, Check, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

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
          <div className="mb-5">
            <p className="label-text mb-2">Start Time</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Hours", value: hours, setter: setHours, max: 23 },
                { label: "Minutes", value: minutes, setter: setMinutes, max: 59 },
                { label: "Seconds", value: seconds, setter: setSeconds, max: 59 },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs mb-1 block" style={{ color: "var(--text-subtle)" }}>{field.label}</label>
                  <input
                    type="number" min={0} max={field.max} value={field.value}
                    onChange={(e) => field.setter(Math.min(field.max, Math.max(0, Number(e.target.value))))}
                    className="input-base w-full px-3 py-2 text-sm text-center font-mono"
                    style={{ color: "var(--text)" }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm font-bold" style={{ color: "var(--text)" }}>
              → {fmtTime(hours, minutes, seconds)} ({totalSec}s)
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: "#ef4444" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            onClick={validate}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm"
          >
            <Link2 className="w-4 h-4" /> Generate Timestamp Link
          </button>
        </div>

        {/* Generated URLs */}
        {generatedUrl && !error && (
          <div className="card p-6 animate-fade-slide" style={{ backgroundColor: "var(--bg-card)" }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>Your timestamp links</h2>

            {[
              { label: "Shareable link (youtu.be)", value: generatedUrl },
              { label: "Embed URL (for iframe)", value: embedUrl! },
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
      </div>
    </div>
  );
}
