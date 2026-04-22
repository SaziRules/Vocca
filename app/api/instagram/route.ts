import { NextResponse } from "next/server";

/**
 * Instagram Graph API — own media feed
 *
 * Setup:
 * 1. Go to developers.facebook.com → create an App (type: Business or Consumer)
 * 2. Add "Instagram" product, connect your Instagram Business/Creator account
 * 3. Generate a User Access Token with these permissions:
 *      instagram_basic, instagram_manage_insights (for like_count)
 * 4. Exchange for a long-lived token (valid 60 days, refreshable):
 *      GET https://graph.instagram.com/access_token
 *        ?grant_type=ig_exchange_token
 *        &client_id={app-id}
 *        &client_secret={app-secret}
 *        &access_token={short-lived-token}
 * 5. Add INSTAGRAM_ACCESS_TOKEN to .env.local
 *
 * Refresh (before 60 days):
 *      GET https://graph.instagram.com/refresh_access_token
 *        ?grant_type=ig_refresh_token
 *        &access_token={long-lived-token}
 */

const FIELDS = [
  "id",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "like_count",
  "comments_count",
  "timestamp",
].join(",");

const LIMIT = 10;

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN not set" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`,
      {
        next: { revalidate: 3600 }, // cache 1 hour — avoids rate limit hammering
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[instagram] API error:", err);
      return NextResponse.json(
        { error: "Instagram API error", detail: err },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[instagram] fetch failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
