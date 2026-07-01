"use client";
import { useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { FeedbackModal } from "@/app/components/FeedbackModal";

export default function SubpageLayout({ children }: { children: React.ReactNode }) {
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
