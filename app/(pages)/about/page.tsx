import type { Metadata } from "next";
export const metadata: Metadata = { title: "About Us", description: "About the YouTube Playlist Length Calculator — a free tool for YouTube watchers built to save you time." };

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold mb-4" style={{ color: "var(--text)" }}>About</h1>
        <div className="space-y-4 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
          <p>
            <strong style={{ color: "var(--text)" }}>YouTube Playlist Length Calculator</strong> is a free online tool that helps you calculate the total duration of any YouTube playlist or video — instantly, with no sign-up required.
          </p>
          <p>
            We built this tool because we wanted a fast, reliable way to know how long a playlist is before committing to it. The YouTube UI doesn&apos;t show total playlist duration, so we built the solution.
          </p>
          <h2 className="text-xl font-bold mt-6" style={{ color: "var(--text)" }}>What We Offer</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Total playlist duration at any playback speed</li>
            <li>Single video duration lookup</li>
            <li>Multi-URL aggregation</li>
            <li>Daily watch plan with finish date</li>
            <li>Expandable video list with thumbnails</li>
            <li>YouTube Thumbnail Downloader</li>
            <li>YouTube Timestamp Link Generator</li>
          </ul>
          <h2 className="text-xl font-bold mt-6" style={{ color: "var(--text)" }}>Privacy</h2>
          <p>We don&apos;t store any data. No sign-up, no cookies beyond theme preference, no tracking.</p>
        </div>
      </div>
    </div>
  );
}
