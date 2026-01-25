// /app/api/slack/events/route.ts
import { NextResponse } from "next/server";
import { broadcast } from "@/lib/sse";
import crypto from "node:crypto";
import { Client, Databases, ID, Query } from "node-appwrite";

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
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);
const databases = new Databases(client);
export async function POST(req: Request) {
  console.log("post triggered");
  // at top of POST handler
  if (!process.env.SLACK_SIGNING_SECRET) {
    console.error("SLACK_SIGNING_SECRET missing at runtime — check env config and runtime setting");
    return new Response("Server misconfigured", { status: 500 });
  }
  const verification = await verifySlackRequest(req);
  if (!verification.ok) {
    console.warn("Slack verification failed:", verification.reason);
    return new Response("Invalid signature", { status: 401 });
  }

  const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;

  const body = JSON.parse(verification.rawBody!);
  const userId = body.event.user;
  console.dir(body)
  let username: string = "";
  let avatar: string = "";
  let email: string = "";
  let isBot = false;
  let text = "";

  if (body.type === "url_verification") {
    return new Response(body.challenge, { status: 200 });
  }


  if (
    body.event?.type !== "message" ||
    body.event.subtype) {
    return NextResponse.json({ ok: true })
  }
  if (!SLACK_TOKEN) {
    console.error("Missing SLACK_BOT_TOKEN")
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  const response = NextResponse.json({ ok: true });

  queueMicrotask(() => handleMessage(body))

  return response;
  async function handleMessage(body) {
    try {
      await fetch(
        "https://cloud.appwrite.io/v1/functions/69687db0000e87979d30/executions",
        {
          method: "POST",
          headers: {
            "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": process.env.APPWRITE_API_KEY,
            "X-Appwrite-User-Agent": "NextJS-Slack-Bridge",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: body.event.user,
            text: body.event.text,
          }),
        },
      );
    }
    catch (error) {
      console.error("Failed to execute Appwrite Function handleMessage ")
    }

    if (userId) {
      try {
        const response = await fetch(
          `https://slack.com/api/users.info?user=${body.event.user}`,
          {
            headers: {
              Authorization: `Bearer ${SLACK_TOKEN}`
            },
          }
        )
        const data = await response.json();
        if (data.ok && data.user) {
          const user = data.user;
          isBot = !!user.is_bot || !!user.is_app_user;
          text = body.event.text
          username = user.profile?.display_name ||
            user.profile?.real_name ||
            user.real_name ||
            user.name;
          avatar = user.profile?.image_72 ||
            user.profile?.image_192 ||
            user.profile?.image_512 ||
            null;
          email = user.profile?.email || null;

        } else { console.warn("user.info failed", data); }
      } catch (error) {
        console.error(error, "Failed to connect to slack")
      }

      if (isBot) {
        try {
          const response = await databases.listDocuments({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            collectionId: "characters",
            queries: [
              Query.equal('name', username.trim()),
            ]
          })
          if (response.documents.length > 0) {
            avatar = response.documents[0].imageUrl || avatar;
          }
        } catch (error) {
          console.error(error, "Couldn't Get character Info for bot.");
        };
      }
      // fallback for bot messages

      username = body.event.text.split(":")[0].trim();
      try {
        const response = await databases.listDocuments({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          collectionId: "characters",
          queries: [
            Query.equal('name', username.trim()),
          ]
        })
        console.log("image")
        console.dir(response.documents[0])
        avatar = response.documents[0].imageUrl || "/images/default.png";
        console.dir(avatar)
      } catch (error) {
        console.error(error, "Couldn't Get character Info.");
      };
      console.dir(avatar)
      isBot = true;
      text = body.event.text.split(":")[1].trim();
    }


    const normalized = {
      userId,
      username,
      avatar,
      email,
      isBot,
      text,
      channel: body.event.channel,
      ts: body.event.ts,
    };
    broadcast(normalized);

    await databases.createDocument({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_STORYLINE_DATABASE_ID!,
      collectionId: "messages",
      documentId: ID.unique(),
      data: normalized,
    });
    console.log("broadcasting:", normalized);
  }


}
async function verifySlackRequest(req: Request): Promise<{ ok: boolean; rawBody?: string; reason?: string }> {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) return { ok: false, reason: "missing signing secret" };

  const timestamp = req.headers.get("x-slack-request-timestamp");
  const signature = req.headers.get("x-slack-signature");

  if (!timestamp || !signature) return { ok: false, reason: "missing headers" };

  const tsNum = Number(timestamp);
  if (!Number.isFinite(tsNum)) return { ok: false, reason: "invalid timestamp" };

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - tsNum) > 60 * 5) return { ok: false, reason: "timestamp outside allowed window" };

  // Read raw body exactly once
  const rawBody = await req.text();

  // Build basestring and compute HMAC
  const basestring = `v0:${timestamp}:${rawBody}`;
  const hmac = crypto.createHmac("sha256", signingSecret).update(basestring).digest("hex");
  const mySig = `v0=${hmac}`;

  // Normalize header and buffers
  const headerSig = signature.trim();
  const mySigBuf = Buffer.from(mySig, "utf8");
  const headerBuf = Buffer.from(headerSig, "utf8");

  if (headerBuf.length !== mySigBuf.length) return { ok: false, reason: "signature length mismatch" };

  const equal = crypto.timingSafeEqual(mySigBuf, headerBuf);
  if (!equal) return { ok: false, reason: "signature mismatch" };

  return { ok: true, rawBody };
}
