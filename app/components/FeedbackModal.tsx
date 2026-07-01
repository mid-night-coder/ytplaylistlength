"use client";
import { useState } from "react";
import { X, Bug, Lightbulb, HelpCircle, Heart, Send, CheckCircle2, Loader2 } from "lucide-react";

type FeedbackType = "bug" | "feature" | "question" | "thanks";

const TYPES: { value: FeedbackType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "bug", label: "Bug Report", icon: <Bug className="w-4 h-4 text-red-500" />, color: "red" },
  { value: "feature", label: "Feature Idea", icon: <Lightbulb className="w-4 h-4 text-blue-500" />, color: "blue" },
  { value: "question", label: "Question", icon: <HelpCircle className="w-4 h-4 text-yellow-500" />, color: "yellow" },
  { value: "thanks", label: "Say Thanks", icon: <Heart className="w-4 h-4 text-green-500" />, color: "green" },
];

export function FeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const reset = () => {
    setType(null); setMessage(""); setEmail(""); setSending(false); setSent(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !message.trim() || !email.trim()) return;
    setSending(true);
    // Simulate send (replace with real form endpoint if desired)
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const colorMap: Record<string, string> = {
    red: "border-red-500 bg-red-50 dark:bg-red-950/20",
    blue: "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
    yellow: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
    green: "border-green-500 bg-green-50 dark:bg-green-950/20",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={reset} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-slide"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div>
            <h2 className="font-bold text-base" style={{ color: "var(--text)" }}>We&apos;d Love Your Feedback!</h2>
            <p className="text-xs" style={{ color: "var(--text-subtle)" }}>Help us make this tool better</p>
          </div>
          <button onClick={reset} className="ml-auto p-1 rounded-lg transition-colors hover:bg-[var(--bg-hover)]" style={{ color: "var(--text-subtle)" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>Thank You! 🎉</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Your feedback means a lot to us.</p>
            <button onClick={reset} className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Type selector */}
            <div>
              <p className="label-text mb-3">What&apos;s on your mind?</p>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      type === t.value ? colorMap[t.color] : "border-transparent hover:bg-[var(--bg-hover)]"
                    }`}
                    style={{ borderColor: type === t.value ? undefined : "var(--border)", color: "var(--text-muted)" }}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text mb-1.5 block" htmlFor="fb-message">Tell us more</label>
              <textarea
                id="fb-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-base w-full px-4 py-3 text-sm resize-none"
                placeholder="Share your thoughts…"
                required
              />
            </div>

            <div>
              <label className="label-text mb-1.5 block" htmlFor="fb-email">
                Your email <span className="text-red-500">*</span>
              </label>
              <input
                id="fb-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base w-full px-4 py-3 text-sm"
                placeholder="you@example.com"
                required
              />
              <p className="mt-1 text-xs" style={{ color: "var(--text-subtle)" }}>So we can get back to you 😊</p>
            </div>

            <button
              type="submit"
              disabled={sending || !type || !message.trim() || !email.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3 text-sm"
            >
              {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send Feedback</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
