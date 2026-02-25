"use client";

import AchievementTracker from "@/components/AchievementTracker";
import { getCurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-12">
      <main className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          TribeSync
        </h1>
        <p className="max-w-md text-lg text-foreground/70">
          Gamify your fitness and reading goals with friends. Build your tribe,
          track achievements, and climb the leaderboard together.
        </p>
        
        {user && (
          <p className="text-sm text-foreground/60">
            Welcome, {user.name}!
          </p>
        )}

        {/* Achievement Tracker */}
        <div className="mt-8 w-full">
          <AchievementTracker />
        </div>
      </main>
    </div>
  );
}
