"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Calculator, Clock, Film, Zap, AlertCircle, CheckCircle2,
  Loader2, ChevronRight, Timer, TrendingUp, TrendingDown,
  Copy, Check, ExternalLink, Info,
} from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FeedbackModal } from "./components/FeedbackModal";
import { ShareButtons } from "./components/ShareButtons";
import {
  ResponsiveLeaderboard,
  ResponsiveMediumBanner,
  NativeAdBanner,
  SkyscraperRow,
  PartnerOfferLink,
  AdCluster,
  CoinzUpBanner,
  SideAdColumn,
  AdsterraBannerGroup,
  AllBannersShowcase,
  AutoTagBannerGroup,
  CoinzUpPtpWindow,
  CoinzUpPtpCard,
  EffectiveCpmWindow,
  EffectiveCpmCard,
  AAdsStickyBottomBanner,
  EffectiveCpmMultiWindows,
  EffectiveCpmScriptAdWall,
  AdsBitcoinBanner,
} from "./components/AdBanner";
import { VideoList } from "./components/VideoList";
import { DailyWatchPlan } from "./components/DailyWatchPlan";
import {
  formatDuration, formatAverage, formatDurationCompact,
  extractPlaylistId, extractVideoId,
} from "@/lib/utils";
import type { VideoDetail } from "@/lib/youtube";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResultData {
  totalVideos: number;
  totalSeconds: number;
  skippedVideos: number;
  playlistTitle: string;
  videos: VideoDetail[];
  longestVideo?: VideoDetail;
  shortestVideo?: VideoDetail;
}

type CalcMode = "full" | "range" | "remaining";

interface HistoryItem {
  url: string;
  title: string;
  totalVideos: number;
  totalSeconds: number;
  ts: number;
}

// ─── Speed card config ────────────────────────────────────────────────────────

const SPEED_CARDS = [
  { speed: 1,    label: "1× Normal",    bg: "from-zinc-800/60 to-zinc-900/60", border: "border-zinc-700/50", text: "text-zinc-200" },
  { speed: 1.25, label: "1.25× Speed",  bg: "from-violet-950/50 to-zinc-900/60", border: "border-violet-700/40", text: "text-violet-300" },
  { speed: 1.5,  label: "1.5× Speed",   bg: "from-blue-950/50 to-zinc-900/60", border: "border-blue-700/40", text: "text-blue-300" },
  { speed: 1.75, label: "1.75× Speed",  bg: "from-cyan-950/50 to-zinc-900/60", border: "border-cyan-700/40", text: "text-cyan-300" },
  { speed: 2,    label: "2× Speed",     bg: "from-emerald-950/50 to-zinc-900/60", border: "border-emerald-700/40", text: "text-emerald-300" },
];

// ─── Helper components ────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="card p-4 flex flex-col gap-1.5 transition-all hover:border-[var(--accent)]/30">
      <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        {icon} {label}
      </div>
      <p className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>{value}</p>
      {sub && <p className="text-xs" style={{ color: "var(--text-subtle)" }}>{sub}</p>}
    </div>
  );
}

function SpeedCard({ speed, label, bg, border, text, totalSeconds, customSpeed }: {
  speed: number; label: string; bg: string; border: string; text: string;
  totalSeconds: number; customSpeed?: number;
}) {
  const effectiveSpeed = customSpeed ?? speed;
  const adjusted = totalSeconds / effectiveSpeed;
  const saved = totalSeconds - adjusted;
  return (
    <div className={`rounded-xl border bg-gradient-to-br ${bg} ${border} p-4 transition-all hover:scale-[1.015]`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${text}`}>{customSpeed ? `${customSpeed}× Custom` : label}</span>
        {effectiveSpeed > 1 && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-subtle)", border: "1px solid var(--border)" }}>
            saves {formatDurationCompact(saved)}
          </span>
        )}
      </div>
      <p className="text-lg font-bold" style={{ color: "var(--text)" }}>{formatDuration(adjusted)}</p>
      <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-subtle)" }}>{formatDurationCompact(adjusted)}</p>
    </div>
  );
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all"
      style={{
        backgroundColor: active ? "var(--bg-card)" : "transparent",
        color: active ? "var(--text)" : "var(--text-subtle)",
        boxShadow: active ? "0 1px 2px rgb(0 0 0/0.1)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function CopyResultsBtn({ result }: { result: ResultData }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = [
      `📋 ${result.playlistTitle}`,
      `Videos: ${result.totalVideos}`,
      `Total: ${formatDuration(result.totalSeconds)}`,
      `1.25×: ${formatDuration(result.totalSeconds / 1.25)}`,
      `1.5×:  ${formatDuration(result.totalSeconds / 1.5)}`,
      `1.75×: ${formatDuration(result.totalSeconds / 1.75)}`,
      `2×:    ${formatDuration(result.totalSeconds / 2)}`,
      `— ytplaylistlengthcal.vercel.app`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--bg-hover)]"
      style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy results"}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [mode, setMode] = useState<CalcMode>("full");
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1000);
  const [watchedThrough, setWatchedThrough] = useState("");
  const [includeCurrentVideo, setIncludeCurrentVideo] = useState(false);
  const [customSpeed, setCustomSpeed] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("yt_history") ?? "[]");
      setHistory(stored);
    } catch { /* ignore */ }
  }, []);

  // Live URL validation
  const urlTrimmed = url.trim();
  const detectedPlaylistId = extractPlaylistId(urlTrimmed);
  const detectedVideoId = extractVideoId(urlTrimmed);
  const hasValidUrl = urlTrimmed.length > 0 && (detectedPlaylistId || detectedVideoId);

  const saveToHistory = useCallback((r: ResultData, inputUrl: string) => {
    const item: HistoryItem = {
      url: inputUrl,
      title: r.playlistTitle,
      totalVideos: r.totalVideos,
      totalSeconds: r.totalSeconds,
      ts: Date.now(),
    };
    setHistory((prev) => {
      const next = [item, ...prev.filter((h) => h.url !== inputUrl)].slice(0, 5);
      localStorage.setItem("yt_history", JSON.stringify(next));
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlTrimmed || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const body: Record<string, unknown> = { url: urlTrimmed, mode };
      if (mode === "range") { body.startIndex = startIndex; body.endIndex = endIndex; }
      if (mode === "remaining") { body.watchedThrough = Number(watchedThrough) || 0; body.includeCurrentVideo = includeCurrentVideo; }

      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error ?? "An unexpected error occurred.");
      } else {
        setResult(json.data);
        saveToHistory(json.data, urlTrimmed);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const customSpeedNum = parseFloat(customSpeed);
  const validCustomSpeed = !isNaN(customSpeedNum) && customSpeedNum >= 0.25 && customSpeedNum <= 10;

  return (
    <>
      <CoinzUpPtpWindow />
      <EffectiveCpmWindow />
      <AAdsStickyBottomBanner />
      <Header onFeedback={() => setFeedbackOpen(true)} />
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <div className="w-full flex justify-center items-start min-h-screen overflow-x-hidden" style={{ backgroundColor: "var(--bg)" }}>
        {/* Left Ad Sidebar filling all left space */}
        <SideAdColumn side="left" count={35} />

        {/* Main Center Content */}
        <div className="flex-1 min-w-0 max-w-4xl mx-auto">
          <div className="px-4">
            <AdsBitcoinBanner />
            <EffectiveCpmMultiWindows />
            <EffectiveCpmScriptAdWall count={40} />
            <EffectiveCpmCard />
            <AllBannersShowcase />
            <CoinzUpBanner />
            <AdsterraBannerGroup count={10} />
            <AutoTagBannerGroup count={10} />
            <AdCluster count={3} />
            <CoinzUpBanner />
          </div>

          <div style={{ backgroundColor: "var(--bg)" }}>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-10 sm:py-14">
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl bg-red-600" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 blur-3xl bg-violet-600" />

          <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
            {/* Badge */}
            <div className="flex justify-center mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "color-mix(in srgb, #22c55e 10%, transparent)", border: "1px solid color-mix(in srgb, #22c55e 25%, transparent)", color: "#16a34a" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                Free · No Sign-up Required · Instant Results
              </span>
            </div>

            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "var(--text)" }}>
              <span className="text-red-500">YouTube</span> Playlist<br className="sm:hidden" /> Length Calculator
            </h1>
            <p className="text-center text-sm sm:text-base mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              Calculate total watch time for any playlist or video at normal and faster playback speeds — instantly.
            </p>

            <ResponsiveMediumBanner className="mb-4" />
            <ResponsiveLeaderboard className="mb-6" />

            {/* ── Calculator card ── */}
            <div className="card p-5 sm:p-7 shadow-xl">
              <form onSubmit={handleSubmit} noValidate>
                {/* URL Input */}
                <div className="mb-4">
                  <label htmlFor="playlist-url" className="label-text mb-2 block">
                    Paste YouTube URL
                  </label>
                  <textarea
                    id="playlist-url"
                    rows={3}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={`Playlist → youtube.com/playlist?list=PLxxxxxx\nVideo → youtu.be/dQw4w9WgXcQ\nTip: Paste multiple links, one per line`}
                    className="input-base w-full px-4 py-3 text-sm resize-none"
                    style={{ color: "var(--text)" }}
                  />
                  {/* Live detection */}
                  {urlTrimmed.length > 0 && (
                    <div className="mt-1.5">
                      {detectedPlaylistId ? (
                        <p className="text-xs text-green-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Playlist detected: <code className="font-mono bg-green-500/10 px-1 rounded">{detectedPlaylistId.slice(0, 20)}…</code>
                        </p>
                      ) : detectedVideoId ? (
                        <p className="text-xs text-blue-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Single video detected: <code className="font-mono bg-blue-500/10 px-1 rounded">{detectedVideoId}</code>
                        </p>
                      ) : (
                        <p className="text-xs text-amber-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          No YouTube playlist or video found in this URL
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Advanced options */}
                <details
                  className="mb-4"
                  open={advancedOpen}
                  onToggle={(e) => setAdvancedOpen((e.target as HTMLDetailsElement).open)}
                >
                  <summary
                    className="flex items-center gap-2 cursor-pointer text-sm select-none list-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ChevronRight
                      className="w-4 h-4 transition-transform duration-200"
                      style={{ transform: advancedOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                    Advanced options
                  </summary>

                  <div className="mt-4 space-y-4">
                    {/* Calculation Mode */}
                    <div>
                      <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Calculation Mode</p>
                      <div
                        className="flex gap-1 p-1 rounded-xl"
                        style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
                      >
                        <ModeButton active={mode === "full"} onClick={() => setMode("full")}>Full Playlist</ModeButton>
                        <ModeButton active={mode === "range"} onClick={() => setMode("range")}>Specific Range</ModeButton>
                        <ModeButton active={mode === "remaining"} onClick={() => setMode("remaining")}>Remaining</ModeButton>
                      </div>
                    </div>

                    {/* Range inputs */}
                    {mode === "range" && (
                      <div>
                        <p className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                          Video Range
                          <span title="Calculate from video #Start to video #End">
                            <Info className="w-3.5 h-3.5" />
                          </span>
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs mb-1 block" style={{ color: "var(--text-subtle)" }}>From video #</label>
                            <input type="number" min={1} value={startIndex}
                              onChange={(e) => setStartIndex(Number(e.target.value))}
                              className="input-base w-full px-3 py-2 text-sm" style={{ color: "var(--text)" }} />
                          </div>
                          <div>
                            <label className="text-xs mb-1 block" style={{ color: "var(--text-subtle)" }}>To video #</label>
                            <input type="number" min={1} value={endIndex}
                              onChange={(e) => setEndIndex(Number(e.target.value))}
                              className="input-base w-full px-3 py-2 text-sm" style={{ color: "var(--text)" }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remaining mode */}
                    {mode === "remaining" && (
                      <div
                        className="rounded-xl p-4"
                        style={{ backgroundColor: "color-mix(in srgb, #ef4444 5%, transparent)", border: "1px solid color-mix(in srgb, #ef4444 20%, transparent)" }}
                      >
                        <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>
                          I have watched through video #
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                          <input
                            type="number" min={0} value={watchedThrough}
                            onChange={(e) => setWatchedThrough(e.target.value)}
                            placeholder="e.g. 15"
                            className="input-base px-3 py-2 text-sm w-full sm:w-32" style={{ color: "var(--text)" }}
                          />
                          <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--text-muted)" }}>
                            <input
                              type="checkbox" checked={includeCurrentVideo}
                              onChange={(e) => setIncludeCurrentVideo(e.target.checked)}
                              className="accent-red-500 w-4 h-4"
                            />
                            Include current video
                          </label>
                        </div>
                        <p className="text-xs mt-2" style={{ color: "var(--text-subtle)" }}>
                          The calculator will show duration for unwatched videos only.
                        </p>
                      </div>
                    )}

                    {/* Custom Playback Speed */}
                    <div>
                      <p className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        Custom Playback Speed
                        <span title="Add an extra speed card with your custom speed">
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      </p>
                      <input
                        type="number" min={0.25} max={10} step={0.05}
                        value={customSpeed}
                        onChange={(e) => setCustomSpeed(e.target.value)}
                        placeholder="e.g. 2.25"
                        className="input-base w-full px-4 py-2 text-sm mb-2" style={{ color: "var(--text)" }}
                      />
                      <div className="flex gap-1.5">
                        {[1.25, 1.5, 1.75, 2].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setCustomSpeed(String(s))}
                            className="flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors"
                            style={{
                              backgroundColor: customSpeed === String(s) ? "var(--accent)" : "var(--bg-input)",
                              color: customSpeed === String(s) ? "#fff" : "var(--text-muted)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {s}×
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                {/* Error */}
                {error && (
                  <div className="mb-4 flex items-start gap-3 rounded-xl p-4 text-sm"
                    style={{ backgroundColor: "color-mix(in srgb, #ef4444 8%, transparent)", border: "1px solid color-mix(in srgb, #ef4444 25%, transparent)", color: "#ef4444" }}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  id="calculate-btn"
                  type="submit"
                  disabled={loading || !hasValidUrl}
                  className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Calculating…</>
                    : <><Calculator className="w-4 h-4" /> Calculate Duration</>
                  }
                </button>
              </form>

              {/* Share + meta */}
              <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-center text-xs mb-3" style={{ color: "var(--text-subtle)" }}>
                  No sign-up required · Supports playlists, single videos, and multiple URLs
                </p>
                <ShareButtons />
              </div>
            </div>

            <CoinzUpBanner />
            <AdCluster count={3} />
            <CoinzUpBanner />

            {/* ── History ── */}
            {history.length > 0 && !result && (
              <div className="mt-4">
                <p className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: "var(--text-subtle)" }}>
                  <Clock className="w-3 h-3" /> Recent searches
                </p>
                <div className="space-y-1.5">
                  {history.map((h) => (
                    <button
                      key={h.ts}
                      onClick={() => setUrl(h.url)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-left transition-colors hover:bg-[var(--bg-hover)]"
                      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
                    >
                      <div className="min-w-0">
                        <p className="font-medium truncate text-xs">{h.title}</p>
                        <p className="text-xs truncate" style={{ color: "var(--text-subtle)" }}>
                          {h.totalVideos} videos · {formatDurationCompact(h.totalSeconds)}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" style={{ color: "var(--text-subtle)" }} />
                    </button>
                  ))}
                </div>
                <CoinzUpBanner />
                <AdCluster count={2} />
                <CoinzUpBanner />
              </div>
            )}

            {/* ── Results ── */}
            {result && (
              <div ref={resultsRef} className="mt-6 animate-fade-slide" aria-live="polite">
                {/* Title row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-base font-bold leading-tight" style={{ color: "var(--text)" }}>
                      {result.playlistTitle}
                    </h2>
                    {result.skippedVideos > 0 && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>
                        {result.skippedVideos} video{result.skippedVideos !== 1 ? "s" : ""} unavailable/skipped
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyResultsBtn result={result} />
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "color-mix(in srgb, #22c55e 12%, transparent)", border: "1px solid color-mix(in srgb, #22c55e 25%, transparent)", color: "#16a34a" }}>
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  </div>
                </div>

                <CoinzUpBanner />
                <AdCluster count={2} />

                {/* Summary stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <StatCard icon={<Film className="w-3.5 h-3.5" />} label="Total Videos" value={result.totalVideos.toLocaleString()} sub="in playlist" />
                  <StatCard icon={<Timer className="w-3.5 h-3.5" />} label="Avg Length" value={formatAverage(result.totalSeconds, result.totalVideos)} sub="per video" />
                  <div className="col-span-2 sm:col-span-1">
                    <StatCard icon={<Clock className="w-3.5 h-3.5" />} label="Total Duration" value={formatDuration(result.totalSeconds)} sub="at 1× playback" />
                  </div>
                </div>

                <CoinzUpBanner />
                <AdCluster count={2} />

                {/* Longest / Shortest */}
                {result.longestVideo && result.shortestVideo && result.totalVideos > 1 && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <a href={`https://www.youtube.com/watch?v=${result.longestVideo.id}`} target="_blank" rel="noopener noreferrer"
                      className="card p-3 flex items-start gap-2 hover:border-[var(--accent)]/40 transition-all group">
                      <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-subtle)" }}>Longest</p>
                        <p className="text-xs font-semibold truncate group-hover:text-red-500 transition-colors" style={{ color: "var(--text)" }}>{result.longestVideo.title}</p>
                        <p className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>{formatDurationCompact(result.longestVideo.durationSeconds)}</p>
                      </div>
                    </a>
                    <a href={`https://www.youtube.com/watch?v=${result.shortestVideo.id}`} target="_blank" rel="noopener noreferrer"
                      className="card p-3 flex items-start gap-2 hover:border-[var(--accent)]/40 transition-all group">
                      <TrendingDown className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-subtle)" }}>Shortest</p>
                        <p className="text-xs font-semibold truncate group-hover:text-red-500 transition-colors" style={{ color: "var(--text)" }}>{result.shortestVideo.title}</p>
                        <p className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>{formatDurationCompact(result.shortestVideo.durationSeconds)}</p>
                      </div>
                    </a>
                  </div>
                )}

                <AdCluster count={2} />

                {/* Speed cards */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Watch time at different speeds</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {SPEED_CARDS.map((c) => (
                    <SpeedCard key={c.speed} {...c} totalSeconds={result.totalSeconds} />
                  ))}
                  {validCustomSpeed && (
                    <SpeedCard speed={customSpeedNum} label="" bg="from-pink-950/50 to-zinc-900/60" border="border-pink-700/40" text="text-pink-300"
                      totalSeconds={result.totalSeconds} customSpeed={customSpeedNum} />
                  )}
                </div>

                <AdCluster count={2} />

                {/* Daily Watch Plan */}
                <div className="mb-4">
                  <DailyWatchPlan totalSeconds={result.totalSeconds} />
                </div>

                <AdCluster count={2} />

                {/* Video List */}
                {result.videos && result.videos.length > 0 && (
                  <div className="mb-4">
                    <VideoList videos={result.videos} totalVideos={result.totalVideos} />
                  </div>
                )}

                <AdCluster count={2} />

                {/* Try another */}
                <button
                  onClick={() => { setResult(null); setUrl(""); setError(null); }}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                >
                  ← Calculate another playlist
                </button>

                <AdCluster count={2} />
              </div>
            )}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-12 border-t" style={{ borderColor: "var(--border)" }} aria-labelledby="how-it-works">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <CoinzUpBanner />
            <AdCluster count={2} />
            <h2 id="how-it-works" className="section-title">How it works</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Paste your URL", desc: "Copy any YouTube playlist or video URL — desktop, mobile, or shortened (youtu.be)." },
                { step: "02", title: "We fetch everything", desc: "Our server paginates through all videos, even 1000+ playlists, using the YouTube Data API." },
                { step: "03", title: "Get instant results", desc: "See total duration, all speed cards, daily watch plan, and individual video list in seconds." },
              ].map((item) => (
                <div key={item.step} className="card p-5">
                  <div className="text-3xl font-black mb-3" style={{ color: "color-mix(in srgb, var(--text) 15%, transparent)" }}>{item.step}</div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <AdCluster count={3} />
          </div>
        </section>

        {/* Native Recommendation Grid Ad */}
        <div className="mx-auto max-w-4xl px-4">
          <CoinzUpBanner />
          <AdCluster count={2} />
          <NativeAdBanner />
          <AdCluster count={2} />
        </div>

        {/* ── FAQ ── */}
        <section className="py-12 border-t" style={{ borderColor: "var(--border)" }} aria-labelledby="faq-heading">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <CoinzUpBanner />
            <AdCluster count={2} />
            <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Does this work for private playlists?", a: "No. The YouTube API only returns data for public and unlisted playlists. Private playlists will return an error." },
                { q: "How are playlists with 500+ videos handled?", a: "We use full pagination with nextPageToken — playlists with thousands of videos are fully counted." },
                { q: "Can I calculate a single video's duration?", a: "Yes! Just paste a single YouTube video URL (with v= or youtu.be/). The calculator handles both playlists and individual videos." },
                { q: "Can I calculate multiple playlists at once?", a: "Yes. Paste multiple URLs — one per line — in the input box. We aggregate all their durations." },
                { q: "What is the 'Remaining' mode?", a: "Enter how many videos you've already watched. The calculator shows only the time remaining to finish the playlist." },
                { q: "Is my API key safe?", a: "Yes. All YouTube API calls run server-side. Your key is never sent to the browser." },
                { q: "Why might the video count differ from YouTube's count?", a: "Deleted or private videos within a playlist are excluded from the calculation, which may differ from the count shown on YouTube." },
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <details className="card group overflow-hidden" style={{ backgroundColor: "var(--bg-card)" }}>
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 text-sm font-medium cursor-pointer list-none"
                      style={{ color: "var(--text)" }}>
                      {item.q}
                      <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-90" style={{ color: "var(--text-subtle)" }} />
                    </summary>
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.a}</p>
                  </details>
                  <AdCluster count={1} />
                </div>
              ))}
            </div>
            <AdCluster count={2} />
          </div>
        </section>

        {/* Skyscraper & Partner Ads Row */}
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <CoinzUpBanner />
          <AdCluster count={4} />
          <NativeAdBanner className="my-6" />
        </div>
      </div>
      </div>

      {/* Right Ad Sidebar filling all right space */}
      <SideAdColumn side="right" count={35} />
      </div>

      <Footer />
    </>
  );
}
