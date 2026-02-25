"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonProps {
  tribeScore: number;
}

export default function ShareButton({ tribeScore }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I just hit a Tribe Score of ${tribeScore} on TribeSync! Join my tribe and let's crush our fitness & reading goals together.`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  async function handleShare() {
    trackEvent("share_score", "engagement", "share_button_click", tribeScore);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My TribeSync Score",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed — ignore AbortError
        if (err instanceof Error && err.name !== "AbortError") {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      {copied ? "Copied!" : "Share Score"}
    </button>
  );
}
