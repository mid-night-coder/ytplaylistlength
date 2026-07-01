"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ChevronDown, CirclePlay } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
];

export function Header({ onFeedback }: { onFeedback: () => void }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => { setLangOpen(false); setMenuOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-card) 90%, transparent)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600">
            <CirclePlay className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base leading-tight" style={{ color: "var(--text)" }}>
            YT Playlist Length
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                (link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href))
                  ? "text-red-500 bg-red-50 dark:bg-red-950/30"
                  : "hover:bg-[var(--bg-hover)]"
              }`}
              style={{ color: (link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href)) ? undefined : "var(--text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Feedback */}
          <button
            onClick={(e) => { e.stopPropagation(); onFeedback(); }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-muted)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Feedback
          </button>

          {/* Language switcher */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-[var(--bg-hover)]"
              style={{ color: "var(--text-muted)" }}
              aria-label="Select language"
            >
              <span className="text-base">{activeLang.flag}</span>
              <span className="hidden sm:inline text-xs font-medium">{activeLang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border shadow-xl overflow-auto max-h-72 z-50"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="p-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setActiveLang(lang); setLangOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors hover:bg-[var(--bg-hover)]"
                      style={{
                        color: lang.code === activeLang.code ? "var(--accent)" : "var(--text)",
                        fontWeight: lang.code === activeLang.code ? 600 : 400,
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {lang.code === activeLang.code && (
                        <svg className="ml-auto w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-muted)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-muted)" }}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 pb-4 pt-2"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                (link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href))
                  ? "text-red-500 bg-red-50 dark:bg-red-950/30"
                  : "hover:bg-[var(--bg-hover)]"
              }`}
              style={{ color: (link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href)) ? undefined : "var(--text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onFeedback(); }}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-muted)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Feedback
          </button>
        </div>
      )}
    </header>
  );
}
