// SSE client registry for Slack-driven real‑time updates.
// ------------------------------------------------------
// This module maintains an in‑memory list of active Server‑Sent Events
// connections. Each connected client provides a stream controller that
// we retain for the lifetime of the connection. Slack event handlers
// call `broadcast()` to push structured events to every open stream.
//
// Notes for future maintainers:
// - This registry is intentionally process‑local. In a multi‑instance
//   deployment, replace this with a shared transport (Redis pub/sub,
//   durable queue, or WebSocket gateway).
// - Controllers must be removed on disconnect to avoid leaking handles.
// - `broadcast()` emits pre‑formatted SSE payloads; callers should pass
//   plain JS objects and let this module handle serialization.
//
// This file defines the minimal contract required by:
//   /api/slack/stream  → add/remove clients
//   /api/slack/events  → broadcast Slack events to the UI
const clients = new Set<ReadableStreamDefaultController<string>>();

export function addClient(controller: ReadableStreamDefaultController<string>) {
    clients.add(controller);
    console.log("SSE: client added, total=", clients.size);
}

export function removeClient(controller: ReadableStreamDefaultController<string>) {
    if (clients.delete(controller)) {
        console.log("SSE: client removed, total=", clients.size);
    }
}

export function broadcast(data: unknown) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const controller of Array.from(clients)) {
        try {
            controller.enqueue(payload);
        } catch (err) {
            console.warn("SSE: enqueue failed, removing client", err);
            try { controller.close?.(); } catch { }
            clients.delete(controller);
        }
    }
}
