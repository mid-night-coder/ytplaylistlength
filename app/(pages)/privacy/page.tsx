import type { Metadata } from "next";
import { ResponsiveLeaderboard, NativeAdBanner, PartnerOfferLink } from "@/app/components/AdBanner";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy Policy for YouTube Playlist Length Calculator." };

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", body: "We do not collect any personal data. When you use the calculator, your YouTube URL is sent to our server to fetch playlist data via the YouTube Data API v3. We do not store URLs, playlist data, or any user information on our servers." },
    { title: "Cookies", body: "We use a single localStorage key ('theme') to remember your dark/light mode preference. This is stored only in your browser and is never sent to our servers." },
    { title: "Third-Party Services", body: "We use the YouTube Data API v3 (Google) to fetch playlist metadata. Your use of this tool is also subject to Google's Privacy Policy. We do not use any advertising cookies or analytics tracking." },
    { title: "Children's Privacy", body: "This tool is not directed at children under the age of 13 and we do not knowingly collect data from children." },
    { title: "Changes to This Policy", body: "We may update this policy occasionally. Any changes will be posted on this page with an updated effective date." },
    { title: "Contact", body: "If you have any questions about this Privacy Policy, please contact us at hello@ytplaylistlengthcal.vercel.app." },
  ];
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>Privacy Policy</h1>
        <p className="text-xs mb-8" style={{ color: "var(--text-subtle)" }}>Effective date: January 1, 2025</p>
        <ResponsiveLeaderboard className="mb-8" />
        <div className="space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{s.title}</h2>
              <p className="text-sm leading-7" style={{ color: "var(--text-muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
        <PartnerOfferLink className="mt-8" />
        <NativeAdBanner className="mt-10" />
      </div>
    </div>
  );
}
