import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact", description: "Contact us about the YouTube Playlist Length Calculator." };

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold mb-4" style={{ color: "var(--text)" }}>Contact</h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Have feedback, found a bug, or want to suggest a feature? Use the <strong style={{ color: "var(--text)" }}>Feedback</strong> button in the navigation bar — it&apos;s the fastest way to reach us.
        </p>
        <div className="card p-5" style={{ backgroundColor: "var(--bg-card)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Email</p>
          <a href="mailto:" className="text-sm text-red-500 hover:underline">
            
          </a>
          <p className="text-xs mt-3" style={{ color: "var(--text-subtle)" }}>
            We read every message and typically respond within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
