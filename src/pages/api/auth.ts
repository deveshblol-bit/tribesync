import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { adminAuth } from "@/lib/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { action, token } = req.body;

    if (action === "login") {
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }

      try {
        const decodedToken = await adminAuth.verifyIdToken(token);

        const sessionCookie = await adminAuth.createSessionCookie(token, {
          expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
        });

        res.setHeader(
          "Set-Cookie",
          serialize("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 5, // 5 days
          }),
        );

        return res.status(200).json({
          uid: decodedToken.uid,
          email: decodedToken.email,
        });
      } catch {
        return res.status(401).json({ error: "Invalid token" });
      }
    }

    if (action === "logout") {
      res.setHeader(
        "Set-Cookie",
        serialize("session", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        }),
      );

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  if (req.method === "GET") {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const decodedClaims =
        await adminAuth.verifySessionCookie(sessionCookie, true);
      return res.status(200).json({
        uid: decodedClaims.uid,
        email: decodedClaims.email,
      });
    } catch {
      return res.status(401).json({ error: "Invalid session" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
