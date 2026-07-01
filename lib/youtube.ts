import { parseDuration } from "./utils";

const YT_API_BASE = "https://www.googleapis.com/youtube/v3";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VideoDetail {
  id: string;
  title: string;
  channelTitle: string;
  durationSeconds: number;
  thumbnail: string;
}

export interface PlaylistResult {
  totalVideos: number;
  totalSeconds: number;
  skippedVideos: number;
  playlistTitle: string;
  videos: VideoDetail[];
  longestVideo?: VideoDetail;
  shortestVideo?: VideoDetail;
}

interface PlaylistItemsResponse {
  nextPageToken?: string;
  items: Array<{
    contentDetails?: { videoId?: string };
    status?: { privacyStatus?: string };
  }>;
  error?: { code: number; message: string; errors?: Array<{ reason: string }> };
}

interface VideosResponse {
  items: Array<{
    id: string;
    snippet?: { title?: string; channelTitle?: string; thumbnails?: { medium?: { url?: string }; default?: { url?: string } } };
    contentDetails?: { duration?: string };
  }>;
  error?: { code: number; message: string; errors?: Array<{ reason: string }> };
}

interface PlaylistMetaResponse {
  items?: Array<{ snippet?: { title?: string } }>;
  error?: { code: number; message: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function mapApiError(code: number, reason?: string): string {
  if (code === 403) {
    if (reason?.includes("quotaExceeded") || reason?.includes("dailyLimitExceeded")) return "API_QUOTA_EXCEEDED";
    if (reason?.includes("forbidden") || reason?.includes("accessNotConfigured")) return "API_KEY_INVALID";
    return "PLAYLIST_PRIVATE";
  }
  if (code === 404) return "PLAYLIST_NOT_FOUND";
  if (code === 400) return "INVALID_API_REQUEST";
  return "API_ERROR";
}

// ─── Fetch video details in batches of 50 ────────────────────────────────────

async function fetchVideoDetails(videoIds: string[], apiKey: string): Promise<VideoDetail[]> {
  const batches = chunk(videoIds, 50);
  const details: VideoDetail[] = [];

  for (const batch of batches) {
    const url = new URL(`${YT_API_BASE}/videos`);
    url.searchParams.set("part", "contentDetails,snippet");
    url.searchParams.set("id", batch.join(","));
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data: VideosResponse = await res.json();

    if (data.error) throw new Error(mapApiError(data.error.code, data.error.errors?.[0]?.reason));

    for (const item of data.items) {
      const duration = item.contentDetails?.duration ?? "";
      details.push({
        id: item.id,
        title: item.snippet?.title ?? "Unknown Title",
        channelTitle: item.snippet?.channelTitle ?? "Unknown Channel",
        durationSeconds: parseDuration(duration),
        thumbnail: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`,
      });
    }
  }
  return details;
}

// ─── Fetch single video ───────────────────────────────────────────────────────

export async function fetchSingleVideo(videoId: string, apiKey: string): Promise<PlaylistResult> {
  const details = await fetchVideoDetails([videoId], apiKey);
  if (details.length === 0) throw new Error("PLAYLIST_NOT_FOUND");
  const video = details[0];
  return {
    totalVideos: 1,
    totalSeconds: video.durationSeconds,
    skippedVideos: 0,
    playlistTitle: video.title,
    videos: details,
    longestVideo: video,
    shortestVideo: video,
  };
}

// ─── Fetch playlist (with pagination + range support) ────────────────────────

export async function fetchPlaylistData(
  playlistId: string,
  apiKey: string,
  startIndex = 1,
  endIndex = 99999
): Promise<PlaylistResult> {
  // Step 1: playlist title
  let playlistTitle = "YouTube Playlist";
  try {
    const metaUrl = new URL(`${YT_API_BASE}/playlists`);
    metaUrl.searchParams.set("part", "snippet");
    metaUrl.searchParams.set("id", playlistId);
    metaUrl.searchParams.set("key", apiKey);
    const metaData: PlaylistMetaResponse = await (await fetch(metaUrl.toString(), { cache: "no-store" })).json();
    if (metaData.items?.[0]?.snippet?.title) playlistTitle = metaData.items[0].snippet.title;
  } catch { /* non-fatal */ }

  // Step 2: paginate all video IDs
  const allVideoIds: string[] = [];
  let nextPageToken: string | undefined;
  let pageCount = 0;
  const MAX_PAGES = 40;

  do {
    const itemsUrl = new URL(`${YT_API_BASE}/playlistItems`);
    itemsUrl.searchParams.set("part", "contentDetails,status");
    itemsUrl.searchParams.set("playlistId", playlistId);
    itemsUrl.searchParams.set("maxResults", "50");
    itemsUrl.searchParams.set("key", apiKey);
    if (nextPageToken) itemsUrl.searchParams.set("pageToken", nextPageToken);

    const res = await fetch(itemsUrl.toString(), { cache: "no-store" });
    const data: PlaylistItemsResponse = await res.json();

    if (data.error) throw new Error(mapApiError(data.error.code, data.error.errors?.[0]?.reason));

    for (const item of data.items) {
      const videoId = item.contentDetails?.videoId;
      const privacy = item.status?.privacyStatus;
      if (videoId && privacy !== "private" && privacy !== "privacyStatusUnspecified") {
        allVideoIds.push(videoId);
      }
    }

    nextPageToken = data.nextPageToken;
    pageCount++;
  } while (nextPageToken && pageCount < MAX_PAGES);

  if (allVideoIds.length === 0) throw new Error("PLAYLIST_EMPTY");

  // Step 3: apply range (1-based, inclusive)
  const clampedStart = Math.max(1, startIndex);
  const clampedEnd = Math.min(allVideoIds.length, endIndex);
  const rangeIds = allVideoIds.slice(clampedStart - 1, clampedEnd);

  if (rangeIds.length === 0) throw new Error("PLAYLIST_EMPTY");

  // Step 4: fetch details with snippets
  const videos = await fetchVideoDetails(rangeIds, apiKey);
  const skippedVideos = rangeIds.length - videos.length;

  const totalSeconds = videos.reduce((sum, v) => sum + v.durationSeconds, 0);

  // Find longest/shortest
  const sorted = [...videos].sort((a, b) => b.durationSeconds - a.durationSeconds);
  const longestVideo = sorted[0];
  const shortestVideo = sorted[sorted.length - 1];

  return {
    totalVideos: videos.length,
    totalSeconds,
    skippedVideos,
    playlistTitle,
    videos,
    longestVideo,
    shortestVideo,
  };
}
