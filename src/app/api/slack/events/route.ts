// /app/api/slack/events/route.ts
import { NextResponse } from "next/server";
import { broadcast } from "@/lib/sse";
import { Client, Functions, ID, Databases } from "node-appwrite";
import { postData } from "@/lib/database";
export const runtime = "nodejs";
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
  console.log("post triggered");
  const body = await req.json();

  if (body.type === "url_verification") {
    return new Response(body.challenge);
  }

  if (body.event?.type === "message") {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    const functions = new Functions(client);

    await functions.createExecution({
      functionId: "69687db0000e87979d30",
      body: JSON.stringify({
        username: body.event.user,
        text: body.event.text,
      }),
      async: true,
    });
    postData(
      process.env.NEXT_PUBLIC_APPWRITE_STORYLINE_DATABASE_ID,
      "messages",
      ID.unique(),
      body.event,

    )
    const databases = new Databases(client);
    await databases.createDocument({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_STORYLINE_DATABASE_ID!,
      collectionId: "messages",
      documentId: ID.unique(),
      data: {
        username: body.event.user,
        text: body.event.text,
        timestamp: body.event.ts
      }
    });

    console.log("broadcasting:", {
      username: body.event.user,
      text: body.event.text,
    });
  }

  return NextResponse.json({ ok: true });
}
