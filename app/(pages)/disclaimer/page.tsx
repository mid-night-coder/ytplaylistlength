import type { Metadata } from "next";
import { ResponsiveLeaderboard, NativeAdBanner, PartnerOfferLink } from "@/app/components/AdBanner";

export const metadata: Metadata = { title: "Disclaimer", description: "Disclaimer for YouTube Playlist Length Calculator." };

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>Disclaimer</h1>
        <p className="text-xs mb-8" style={{ color: "var(--text-subtle)" }}>Last updated: January 1, 2025</p>
        <ResponsiveLeaderboard className="mb-8" />
        <div className="space-y-6 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
          <p>
            <strong style={{ color: "var(--text)" }}>YouTube Playlist Length Calculator</strong> is an independent, third-party tool. It is not affiliated with, endorsed by, or sponsored by YouTube, Google, or Alphabet Inc.
          </p>
          <p>
            All playlist and video data is retrieved in real-time from the YouTube Data API v3. We do not guarantee the accuracy, completeness, or timeliness of the information returned. Results may differ from what is shown on YouTube if videos are private, deleted, or region-locked.
          </p>
          <p>
            The tool is provided &quot;as is&quot; for informational purposes only. We accept no responsibility for decisions made based on the information provided by this tool.
          </p>
          <p>
            &quot;YouTube&quot; is a trademark of Google LLC. All trademarks belong to their respective owners.
          </p>
        </div>
        <PartnerOfferLink className="mt-8" />
        <NativeAdBanner className="mt-10" />
      </div>
    </div>
  );
}
