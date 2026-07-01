import type { Metadata } from "next";
import { ResponsiveLeaderboard, NativeAdBanner, PartnerOfferLink } from "@/app/components/AdBanner";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms of Service for YouTube Playlist Length Calculator." };

export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", body: "By using YouTube Playlist Length Calculator, you agree to these Terms of Service. If you do not agree, please do not use the tool." },
    { title: "Use of the Tool", body: "This tool is provided free of charge for personal and non-commercial use. You agree not to abuse the service, attempt to circumvent rate limits, or use it in any way that could harm its availability for other users." },
    { title: "YouTube API", body: "This tool uses the YouTube Data API v3. By using this tool you are also agreeing to the YouTube Terms of Service (https://www.youtube.com/t/terms) and Google's Privacy Policy." },
    { title: "No Warranties", body: "The tool is provided 'as is' without warranty of any kind. We do not guarantee uptime, accuracy, or completeness of results. YouTube API quotas may occasionally limit availability." },
    { title: "Limitation of Liability", body: "To the maximum extent permitted by law, we are not liable for any damages arising from the use or inability to use this tool." },
    { title: "Changes to Terms", body: "We reserve the right to modify these terms at any time. Continued use of the tool after changes constitutes acceptance of the new terms." },
  ];
  return (
    <div className="min-screen py-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text)" }}>Terms of Service</h1>
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
