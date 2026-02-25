"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          TribeSync
        </h1>
        <p className="max-w-md text-lg text-foreground/70">
          Gamify your fitness and reading goals with friends. Build your tribe,
          track achievements, and climb the leaderboard together.
        </p>
        <div className="mt-4 flex gap-4">
          {user ? (
            <>
              <p className="text-sm text-foreground/60">
                Signed in as {user.email}
              </p>
              <button
                onClick={signOut}
                className="rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/80"
              >
                Get Started
              </Link>
              <Link
                href="/auth"
                className="rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
