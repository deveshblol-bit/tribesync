export default function Home() {
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
          <button className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/80">
            Get Started
          </button>
          <button className="rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition-colors hover:bg-foreground/5">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
