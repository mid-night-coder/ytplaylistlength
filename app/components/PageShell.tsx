"use client";
import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FeedbackModal } from "./FeedbackModal";

export function PageShell({ children }: { children: React.ReactNode }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  return (
    <>
      <Header onFeedback={() => setFeedbackOpen(true)} />
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
