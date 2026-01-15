// /app/api/slack/events/route.ts
import { NextResponse } from "next/server";
import { broadcast } from "@/lib/sse";

/**
 * POST /api/slack/events
 *
 * Purpose:
 *   Acts as the Slack Events API webhook endpoint. Slack sends all subscribed
 *   workspace events here. This route validates Slack’s URL verification
 *   challenge and forwards incoming message events into the server’s SSE
 *   broadcast system.
 *
 * Responsibilities:
 *   - Parse the incoming Slack event payload.
 *   - Respond to Slack’s initial URL verification challenge.
 *   - Normalize Slack message events into a consistent internal format.
 *   - Broadcast normalized events to all connected SSE clients.
 *   - Return a 200 OK response within Slack’s required 3‑second window.
 *
 * Behavior:
 *   - Only processes `event.type === "message"`; all other events are ignored.
 *   - Does not perform authentication; Slack signs requests externally.
 *   - Does not persist messages; it only forwards them in real time.
 *   - Logs incoming events and outgoing broadcasts for debugging.
 *
 * Returns:
 *   - { ok: true } for all non‑challenge requests.
 *   - Raw challenge string for Slack’s URL verification handshake.
 *
 * Dependencies:
 *   - broadcast(): pushes normalized events to all active SSE clients.
 *   - Slack Events API: sends POST requests to this endpoint.
 *
 * Invariants:
 *   - Must always return a 200‑level response within 3 seconds.
 *   - Must never block or perform long‑running work.
 *   - Must not mutate the Slack payload; only normalize fields.
 *
 * Notes for Future Maintainers:
 *   - If you add signature verification, do it before reading req.json().
 *   - If you add support for more Slack event types, normalize them consistently.
 *   - If you add persistence, do it outside the request‑response path.
 */
export async function POST(req: Request) {
  console.log("post triggered")
  const body = await req.json();

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return new Response(body.challenge);
  }

  if (body.event?.type === "message") {
    const normalized = {
      username: body.event.user,
      text: body.event.text,
    };
    // broadcast(normalized);
    await fetch("https://cloud.appwrite.io/v1/functions/69687db0000e87979d30/executions", {
      method: "POST",
      headers: {
        "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.APPWRITE_API_KEY,
        "X-Appwrite-User-Agent": "NextJS-Slack-Bridge",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: body.event.user,
        text: body.event.text
      })
    });
    console.log("broadcasting:", normalized);
  }

  return NextResponse.json({ ok: true });
}
