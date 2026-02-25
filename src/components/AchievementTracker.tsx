"use client";

import { useEffect, useState } from "react";
import { calculateTribeScore } from "@/utils/tribeScore";
import type { TribeScoreResult } from "@/utils/tribeScore";
import ShareButton from "@/components/ShareButton";
import { trackEvent } from "@/lib/analytics";

interface AchievementEntry {
  id: string;
  title: string;
  type: "fitness" | "reading";
  value: number;
  date: string;
  user: string;
}

export default function AchievementTracker() {
  const [achievements, setAchievements] = useState<AchievementEntry[]>([]);
  const [score, setScore] = useState<TribeScoreResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch achievements");
        return res.json();
      })
      .then((data: AchievementEntry[]) => {
        setAchievements(data);
        const result = calculateTribeScore(
          data.map((a) => ({ type: a.type, value: a.value })),
        );
        setScore(result);
        trackEvent("view_tribe_score", "engagement", "score_loaded", result.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center text-foreground/60">
        Loading achievements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Tribe Score Summary */}
      {score && (
        <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Tribe Score
          </h2>
          <div className="flex items-center justify-around">
            <ScoreBadge label="Total" value={score.total} />
            <ScoreBadge label="Fitness" value={score.fitnessScore} />
            <ScoreBadge label="Reading" value={score.readingScore} />
          </div>
          <div className="mt-4 flex justify-center">
            <ShareButton tribeScore={score.total} />
          </div>
        </div>
      )}

      {/* Achievement List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">
          Recent Achievements
        </h2>
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 rounded-xl border border-foreground/10 p-4 transition-colors hover:bg-foreground/5"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                a.type === "fitness"
                  ? "bg-green-500/15 text-green-600"
                  : "bg-blue-500/15 text-blue-600"
              }`}
            >
              {a.type === "fitness" ? "🏋️" : "📚"}
            </span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="text-sm text-foreground/50">
                {a.user} &middot; {a.date}
              </p>
            </div>
            <span className="rounded-full bg-foreground/10 px-3 py-1 text-sm font-semibold text-foreground">
              +{a.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-foreground/50">{label}</p>
    </div>
  );
}
