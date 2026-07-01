"use client";
import { useState } from "react";
import { Download, AlertCircle, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { ResponsiveLeaderboard, ResponsiveMediumBanner, NativeAdBanner, PartnerOfferLink } from "@/app/components/AdBanner";

interface ThumbnailRes {
  label: string;
  key: string;
  size: string;
  quality: string;
}

const RESOLUTIONS: ThumbnailRes[] = [
  { label: "Max Resolution", key: "maxresdefault", size: "1280×720", quality: "Best" },
  { label: "SD Default",     key: "sddefault",     size: "640×480",  quality: "Good" },
  { label: "HQ Default",     key: "hqdefault",     size: "480×360",  quality: "Medium" },
  { label: "MQ Default",     key: "mqdefault",     size: "320×180",  quality: "Low" },
];

function extractVideoId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  const embedMatch = url.match(/\/(?:embed|shorts|v)\/([A-Za-z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

export default function ThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRes, setActiveRes] = useState("maxresdefault");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const id = extractVideoId(url.trim());
    setTimeout(() => {
      setLoading(false);
      if (id) {
        setVideoId(id);
      } else {
        setError("Could not find a YouTube video ID in this URL. Please use a URL with ?v= or youtu.be/.");
      }
    }, 600);
  };

  const downloadUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/${activeRes}.jpg` : "";
  const activeInfo = RESOLUTIONS.find((r) => r.key === activeRes);

  const handleDownload = async () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `thumbnail_${videoId}_${activeRes}.jpg`;
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "color-mix(in srgb, #22c55e 10%, transparent)", border: "1px solid color-mix(in srgb, #22c55e 25%, transparent)", color: "#16a34a" }}>
            Free · Instant · No watermark
          </span>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>
            YouTube Thumbnail Downloader
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Download any YouTube video thumbnail in the highest quality available. Free and instant.
          </p>
        </div>

        <ResponsiveLeaderboard className="mb-6" />

        {/* Input card */}
        <div className="card p-6 mb-6" style={{ backgroundColor: "var(--bg-card)" }}>
          <form onSubmit={handle}>
            <label htmlFor="thumb-url" className="label-text mb-2 block">YouTube Video URL</label>
            <div className="flex gap-2">
              <input
                id="thumb-url"
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setVideoId(null); setError(""); }}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="input-base flex-1 px-4 py-3 text-sm"
                style={{ color: "var(--text)" }}
              />
              <button type="submit" disabled={loading || !url.trim()} className="btn-primary px-5 py-3 text-sm flex items-center gap-2 shrink-0">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Get
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-start gap-2 text-sm" style={{ color: "#ef4444" }}>
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        {videoId && (
          <div className="card p-6 animate-fade-slide" style={{ backgroundColor: "var(--bg-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium" style={{ color: "var(--text)" }}>Thumbnail found</span>
              <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                Watch video <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Preview */}
            <div className="rounded-xl overflow-hidden mb-4 aspect-video w-full bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${videoId}/${activeRes}.jpg`}
                alt="YouTube thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if maxres doesn't exist
                  (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
            </div>

            {/* Resolution selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {RESOLUTIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRes(r.key)}
                  className="flex flex-col items-center gap-0.5 p-3 rounded-xl text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeRes === r.key ? "var(--accent)" : "var(--bg-input)",
                    color: activeRes === r.key ? "#fff" : "var(--text-muted)",
                    border: `1px solid ${activeRes === r.key ? "transparent" : "var(--border)"}`,
                  }}
                >
                  <span className="font-semibold">{r.label}</span>
                  <span className="opacity-80">{r.size}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4 text-xs" style={{ color: "var(--text-subtle)" }}>
              <span>Selected: <strong style={{ color: "var(--text)" }}>{activeInfo?.label}</strong> · {activeInfo?.size}</span>
              <span>Quality: <strong style={{ color: "var(--text)" }}>{activeInfo?.quality}</strong></span>
            </div>

            {/* Download buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-sm"
              >
                <Download className="w-4 h-4" /> Download JPG
              </button>
              <a
                href={`https://i.ytimg.com/vi/${videoId}/${activeRes}.webp`}
                download={`thumbnail_${videoId}_${activeRes}.webp`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-colors hover:bg-[var(--bg-hover)]"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                <Download className="w-4 h-4" /> Download WebP
              </a>
            </div>
          </div>
        )}

        <ResponsiveMediumBanner className="mt-8" />
        <PartnerOfferLink />
        <NativeAdBanner className="mt-10" />
      </div>
    </div>
  );
}
