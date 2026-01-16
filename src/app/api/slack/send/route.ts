// /app/api/slack/send/route.ts
import { NextResponse } from "next/server";
/**
 * POST /api/slack/send
 *
 * Purpose:
 *   Sends an in‑character message to Slack on behalf of the authenticated user.
 *   This endpoint acts as a thin server‑side proxy to Slack's chat.postMessage API.
 *
 * Responsibilities:
 *   - Parse the incoming JSON payload (name, imageUrl, text).
 *   - Construct a Slack‑compatible message payload using the selected character's identity.
 *   - Forward the message to Slack using the bot token stored in environment variables.
 *   - Return a simple JSON response indicating success.
 *
 * Behavior:
 *   - Does not perform authentication or authorization; assumes upstream middleware
 *     or the UI has already validated the user.
 *   - Does not sanitize or transform message text; Slack handles formatting.
 *   - Logs both the outgoing payload and Slack's response for debugging.
 *
 * Returns:
 *   - { ok: true } on successful forwarding to Slack.
 *   - Slack API errors are logged but not surfaced to the client.
 *
 * Dependencies:
 *   - process.env.SLACK_BOT_TOKEN: Bot token with chat:write permissions.
 *   - process.env.SLACK_CHANNEL_ID: Target Slack channel ID.
 *   - Slack API endpoint: https://slack.com/api/chat.postMessage
 *
 * Invariants:
 *   - Must always send JSON with "Content-Type: application/json".
 *   - Must never expose the bot token to the client.
 *   - Must always POST directly to Slack; no retries or buffering.
 *
 * Notes for Future Maintainers:
 *   - If you add error handling, consider returning Slack's error codes to the UI.
 *   - If you add rate limiting, apply it before calling Slack.
 *   - If you add character lookup, do it server‑side (never trust client‑provided identity).
 */
export async function POST(req: Request) {
  const { name, imageUrl, text } = await req.json();

  const payload = {
    channel: process.env.SLACK_CHANNEL_ID,
    text,
    username: name,
    icon_url: imageUrl,
  };

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  console.log("Slack response:", json);

  return NextResponse.json({ ok: true });
}