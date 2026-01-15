
//appwrite is not enabled streaming on Appwrite hosting
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { addClient, removeClient } from "@/lib/sse";
/**
 * GET /api/slack/stream
 *
 * Purpose:
 *   Establishes a Server‑Sent Events (SSE) connection for real‑time Slack message delivery
 *   to the browser. This endpoint keeps the HTTP connection open indefinitely and pushes
 *   events as they occur.
 *
 * Responsibilities:
 *   - Create a ReadableStream that represents the SSE channel.
 *   - Register the client's stream controller with the global SSE registry (addClient).
 *   - Remove the client on disconnect to prevent memory leaks (removeClient).
 *   - Return the correct SSE headers to ensure the browser maintains a persistent connection.
 *
 * Behavior:
 *   - Connection remains open until the browser navigates away, closes the tab, or loses network.
 *   - No response body is sent immediately; events are pushed asynchronously via broadcast().
 *   - This route must never block, buffer, or perform heavy computation.
 *
 * Returns:
 *   - A streaming HTTP Response with SSE headers.
 *
 * Dependencies:
 *   - addClient(controller): registers the client for future broadcasts.
 *   - removeClient(controller): unregisters the client on disconnect.
 *   - broadcast(message): called elsewhere to push events to all active clients.
 *
 * Invariants:
 *   - Must always return "text/event-stream" with no caching.
 *   - Must never close the stream prematurely.
 *   - Must ensure each connected client has a unique controller reference.
 *
 * Notes for Future Maintainers:
 *   - If you modify the SSE headers, test in all major browsers; SSE is sensitive to caching.
 *   - If you add authentication, do it *before* creating the stream.
 *   - If you add heartbeat/ping messages, send them via broadcast() every 20–30 seconds.
 */
export async function GET() {
  let ctrl;

  const stream = new ReadableStream({
    start(controller) {
      ctrl = controller;
      addClient(controller);
    },
    cancel() {
      removeClient(ctrl);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    },
  });
}