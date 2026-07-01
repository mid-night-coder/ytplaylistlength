import Link from "next/link";
import { CirclePlay } from "lucide-react";

const FOOTER_LINKS = {
  Tools: [
    { label: "Playlist Calculator", href: "/" },
    { label: "Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader" },
    { label: "Timestamp Generator", href: "/tools/youtube-timestamp-link-generator" },
  ],
  Resources: [
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const SHARE_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com/intent/tweet?url=https://ytplaylistlength.one&text=Calculate%20YouTube%20playlist%20length%20instantly!", icon: "𝕏" },
  { label: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=https://ytplaylistlength.one", icon: "f" },
  { label: "Reddit", href: "https://reddit.com/submit?url=https://ytplaylistlength.one&title=YouTube%20Playlist%20Length%20Calculator", icon: "r" },
];

export function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600">
                <CirclePlay className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
                YT Playlist Length
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>
              Free tools for YouTube watchers. No sign-up required.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-subtle)" }}>
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-red-500"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()} YouTube Playlist Length Calculator · Built with Next.js
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-subtle)" }}>Share:</span>
            {SHARE_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors hover:bg-[var(--bg-hover)]"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
