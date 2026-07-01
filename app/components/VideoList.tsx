"use client";
import { useState } from "react";
import { ChevronDown, Clock, Play } from "lucide-react";
import { formatDurationCompact } from "@/lib/utils";
import type { VideoDetail } from "@/lib/youtube";

interface VideoListProps {
  videos: VideoDetail[];
  totalVideos: number;
}

export function VideoList({ videos, totalVideos }: VideoListProps) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? videos : videos.slice(0, 20);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
        style={{ backgroundColor: "var(--bg-card)", color: "var(--text)" }}
      >
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-red-500" />
          <span>View all {totalVideos} videos</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200`}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "var(--text-subtle)" }}
        />
      </button>

      {open && (
        <div className="border-t divide-y" style={{ borderColor: "var(--border)" }}>
          {displayed.map((video, index) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--bg-hover)] group"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              {/* Index */}
              <span className="text-xs w-6 text-right shrink-0 font-mono" style={{ color: "var(--text-subtle)" }}>
                {index + 1}
              </span>

              {/* Thumbnail */}
              <div className="relative w-20 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-red-500 transition-colors" style={{ color: "var(--text)" }}>
                  {video.title}
                </p>
                <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-subtle)" }}>
                  {video.channelTitle}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" style={{ color: "var(--text-subtle)" }} />
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  {formatDurationCompact(video.durationSeconds)}
                </span>
              </div>
            </a>
          ))}

          {/* Load more */}
          {!showAll && videos.length > 20 && (
            <div className="px-5 py-3 text-center" style={{ backgroundColor: "var(--bg-card)" }}>
              <button
                onClick={() => setShowAll(true)}
                className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
              >
                Show {videos.length - 20} more videos ↓
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
