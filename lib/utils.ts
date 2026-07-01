import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── YouTube URL Parsing ──────────────────────────────────────────────────────

/**
 * Extracts a playlist ID (list=…) from any YouTube URL format.
 * Returns null if none found.
 */
export function extractPlaylistId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.trim().match(/[?&]list=([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Extracts a video ID (v=… or youtu.be/…) from any YouTube URL.
 * Returns null if none found.
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  // youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  // v=VIDEO_ID
  const longMatch = trimmed.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  // /embed/VIDEO_ID or /shorts/VIDEO_ID
  const embedMatch = trimmed.match(/\/(?:embed|shorts|v)\/([A-Za-z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

/**
 * Parses a textarea value (one URL per line) into individual valid YouTube URLs.
 */
export function parseMultiUrls(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && (l.includes("youtube.com") || l.includes("youtu.be")));
}

// ─── ISO 8601 Duration Parsing ────────────────────────────────────────────────

/**
 * Parses PT1H2M10S, PT45S, P1DT2H3M4S etc. into total seconds.
 */
export function parseDuration(iso: string): number {
  if (!iso || typeof iso !== "string") return 0;
  const match = iso.match(
    /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/
  );
  if (!match) return 0;
  return (
    parseFloat(match[1] || "0") * 86400 +
    parseFloat(match[2] || "0") * 3600 +
    parseFloat(match[3] || "0") * 60 +
    parseFloat(match[4] || "0")
  );
}

// ─── Time Formatting ──────────────────────────────────────────────────────────

/**
 * Formats seconds into verbose readable: "1 hour, 2 minutes, 10 seconds"
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0 seconds";
  const s = Math.round(totalSeconds);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  if (seconds > 0) parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);
  return parts.join(", ");
}

/**
 * Formats seconds into compact HH:MM:SS or D:HH:MM:SS
 */
export function formatDurationCompact(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0:00:00";
  const s = Math.round(totalSeconds);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return days > 0 ? `${days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
}

/**
 * Duration at speed, formatted verbosely
 */
export function atSpeed(totalSeconds: number, speed: number): string {
  return formatDuration(totalSeconds / speed);
}

/**
 * Average per video formatted verbosely
 */
export function formatAverage(totalSeconds: number, count: number): string {
  if (count === 0) return "N/A";
  return formatDuration(totalSeconds / count);
}

// ─── Daily plan helpers ───────────────────────────────────────────────────────

/**
 * Returns number of days to finish `totalSeconds` of content
 * watching `minutesPerDay` at `speed`.
 */
export function daysToFinish(
  totalSeconds: number,
  minutesPerDay: number,
  speed: number
): number {
  if (minutesPerDay <= 0 || speed <= 0) return 0;
  const adjustedSeconds = totalSeconds / speed;
  const secondsPerDay = minutesPerDay * 60;
  return Math.ceil(adjustedSeconds / secondsPerDay);
}

/**
 * Returns a Date that is `days` days from today.
 */
export function finishDate(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Formats a Date as "Mon DD, YYYY"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
