import type { NextApiRequest, NextApiResponse } from "next";

interface AchievementEntry {
  id: string;
  title: string;
  type: "fitness" | "reading";
  value: number;
  date: string;
  user: string;
}

const mockAchievements: AchievementEntry[] = [
  {
    id: "1",
    title: "Morning Run - 5K",
    type: "fitness",
    value: 5,
    date: "2026-02-25",
    user: "Alex",
  },
  {
    id: "2",
    title: "Finished 'Atomic Habits'",
    type: "reading",
    value: 3,
    date: "2026-02-24",
    user: "Alex",
  },
  {
    id: "3",
    title: "Gym Session - Strength",
    type: "fitness",
    value: 4,
    date: "2026-02-24",
    user: "Jordan",
  },
  {
    id: "4",
    title: "Read 2 Chapters of 'Deep Work'",
    type: "reading",
    value: 2,
    date: "2026-02-23",
    user: "Jordan",
  },
  {
    id: "5",
    title: "Yoga Session - 45 min",
    type: "fitness",
    value: 3,
    date: "2026-02-23",
    user: "Sam",
  },
  {
    id: "6",
    title: "Finished 'The Lean Startup'",
    type: "reading",
    value: 4,
    date: "2026-02-22",
    user: "Sam",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AchievementEntry[]>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  res.status(200).json(mockAchievements);
}
