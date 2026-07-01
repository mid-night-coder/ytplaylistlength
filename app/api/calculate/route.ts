import { NextRequest, NextResponse } from "next/server";
import { fetchPlaylistData, fetchSingleVideo } from "@/lib/youtube";
import { extractPlaylistId, extractVideoId, parseMultiUrls } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      url,
      mode = "full",
      startIndex = 1,
      endIndex = 99999,
      watchedThrough = 0,
      includeCurrentVideo = false,
    } = body as {
      url?: string;
      mode?: "full" | "range" | "remaining";
      startIndex?: number;
      endIndex?: number;
      watchedThrough?: number;
      includeCurrentVideo?: boolean;
    };

    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json({ error: "Please enter a YouTube URL." }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: YOUTUBE_API_KEY is not set." },
        { status: 500 }
      );
    }

    // ── Multi-URL mode: multiple lines each with a URL ────────────────────────
    const lines = parseMultiUrls(url.trim());
    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Invalid URL format. Please enter a valid YouTube playlist or video URL." },
        { status: 400 }
      );
    }

    // ── Resolve effective startIndex / endIndex from mode ─────────────────────
    let effectiveStart = startIndex;
    let effectiveEnd = endIndex;

    if (mode === "remaining") {
      const watched = Math.max(0, watchedThrough);
      effectiveStart = includeCurrentVideo ? watched : watched + 1;
      effectiveEnd = 99999;
    } else if (mode === "full") {
      effectiveStart = 1;
      effectiveEnd = 99999;
    }

    // ── Single-URL handling ───────────────────────────────────────────────────
    if (lines.length === 1) {
      const singleUrl = lines[0];
      const playlistId = extractPlaylistId(singleUrl);
      const videoId = extractVideoId(singleUrl);

      if (playlistId) {
        const result = await fetchPlaylistData(playlistId, apiKey, effectiveStart, effectiveEnd);
        return NextResponse.json({ data: result }, { status: 200 });
      }

      if (videoId) {
        const result = await fetchSingleVideo(videoId, apiKey);
        return NextResponse.json({ data: result }, { status: 200 });
      }

      return NextResponse.json(
        { error: "Could not find a playlist ID or video ID in this URL." },
        { status: 400 }
      );
    }

    // ── Multi-URL aggregation ─────────────────────────────────────────────────
    const { fetchSingleVideo: fetchVideo } = await import("@/lib/youtube");

    let totalSeconds = 0;
    let totalVideos = 0;
    let skippedVideos = 0;
    const allVideos: import("@/lib/youtube").VideoDetail[] = [];
    const titles: string[] = [];

    for (const lineUrl of lines) {
      const playlistId = extractPlaylistId(lineUrl);
      const videoId = extractVideoId(lineUrl);

      if (playlistId) {
        const r = await fetchPlaylistData(playlistId, apiKey, 1, 99999);
        totalSeconds += r.totalSeconds;
        totalVideos += r.totalVideos;
        skippedVideos += r.skippedVideos;
        allVideos.push(...r.videos);
        titles.push(r.playlistTitle);
      } else if (videoId) {
        const r = await fetchVideo(videoId, apiKey);
        totalSeconds += r.totalSeconds;
        totalVideos += r.totalVideos;
        allVideos.push(...r.videos);
        titles.push(r.playlistTitle);
      }
    }

    if (totalVideos === 0) {
      return NextResponse.json({ error: "No valid videos found." }, { status: 400 });
    }

    const sorted = [...allVideos].sort((a, b) => b.durationSeconds - a.durationSeconds);

    return NextResponse.json({
      data: {
        totalVideos,
        totalSeconds,
        skippedVideos,
        playlistTitle: titles.length === 1 ? titles[0] : `${titles.length} Playlists / Videos`,
        videos: allVideos,
        longestVideo: sorted[0],
        shortestVideo: sorted[sorted.length - 1],
      },
    }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "UNKNOWN_ERROR";

    const errorMap: Record<string, { status: number; message: string }> = {
      PLAYLIST_PRIVATE: { status: 403, message: "This playlist is private or restricted. Make sure it is set to Public or Unlisted." },
      PLAYLIST_NOT_FOUND: { status: 404, message: "Playlist not found. It may have been deleted or the URL is incorrect." },
      PLAYLIST_EMPTY: { status: 400, message: "This playlist appears to be empty or all videos are unavailable." },
      API_QUOTA_EXCEEDED: { status: 429, message: "YouTube API quota exceeded for today. Please try again tomorrow." },
      API_KEY_INVALID: { status: 403, message: "The API key is invalid or YouTube Data API v3 is not enabled." },
      API_ERROR: { status: 502, message: "The YouTube API returned an unexpected error. Please try again." },
      INVALID_API_REQUEST: { status: 400, message: "The request to YouTube was malformed. Please check your URL." },
    };

    const mapped = errorMap[message];
    if (mapped) return NextResponse.json({ error: mapped.message }, { status: mapped.status });

    console.error("[/api/calculate]", err);
    return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
  }
}
