"use client";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { daysToFinish, finishDate, formatDate } from "@/lib/utils";

interface DailyWatchPlanProps {
  totalSeconds: number;
}

const SPEED_PRESETS = [1, 1.25, 1.5, 1.75, 2];

export function DailyWatchPlan({ totalSeconds }: DailyWatchPlanProps) {
  const [minutesPerDay, setMinutesPerDay] = useState(60);
  const [speed, setSpeed] = useState(1);

  const days = daysToFinish(totalSeconds, minutesPerDay, speed);
  const endDate = finishDate(days);
  const formattedDate = formatDate(endDate);

  return (
    <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-red-500" />
        <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Daily Watch Plan
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Minutes per day */}
        <div>
          <label className="label-text mb-2 block text-xs" htmlFor="mpd">
            Minutes per day
          </label>
          <div className="flex items-center gap-2">
            <input
              id="mpd"
              type="range"
              min={5}
              max={480}
              step={5}
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(Number(e.target.value))}
              className="flex-1 accent-red-500"
            />
            <span
              className="text-sm font-bold w-12 text-center rounded-lg py-1"
              style={{ color: "var(--text)", backgroundColor: "var(--bg-input)" }}
            >
              {minutesPerDay}m
            </span>
          </div>
        </div>

        {/* Speed */}
        <div>
          <label className="label-text mb-2 block text-xs">Playback speed</label>
          <div className="flex gap-1.5">
            {SPEED_PRESETS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="flex-1 py-1 text-xs rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: speed === s ? "var(--accent)" : "var(--bg-input)",
                  color: speed === s ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className="rounded-xl p-4 flex items-center justify-between gap-4"
        style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              At {minutesPerDay} min/day × {speed}×
            </span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--text)" }}>
            {days === 0 ? "< 1 day" : `${days.toLocaleString()} ${days === 1 ? "day" : "days"}`}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>
            to finish this playlist
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>Finish date</p>
          <p className="text-base font-bold" style={{ color: "var(--text)" }}>{formattedDate}</p>
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            if you start today
          </p>
        </div>
      </div>
    </div>
  );
}
