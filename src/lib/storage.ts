import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import { storage, getServerClient } from "./appwrite-node"; // uses your existing client

export async function getFileURL(bucketId: string, fileId: string) {
  try {
    const result = await storage();
    // Fail fast if Appwrite storage is slow
    const timeoutMs = Number(process.env.APPWRITE_REQUEST_TIMEOUT_MS || 5000);
    const file = await Promise.race([
      result.getFileView(bucketId, fileId),
      new Promise((_r, rej) =>
        setTimeout(
          () =>
            rej(new Error(`Storage request timed out after ${timeoutMs}ms`)),
          timeoutMs,
        ),
      ),
    ]);
    console.log(file);
    return file;
  } catch (error) {
    console.error("Failed to get file download URL:", error);
    throw error;
  }
}
// export async function uploader(bucketId: string, fileId: string) {
//   const result = await storage.createFile({
//     bucketId: '<BUCKET_ID>',
//     fileId: '<FILE_ID>',
//     file: document.getElementById('uploader').files[0],
//     permissions: ["read("any")"] // optional

// })}
// Helper functions for server-side file upload/download.
// IMPORTANT: avoid executing any network I/O at module import time (no top-level await) —
// running I/O on import can cause serverless functions to hang or timeout in production.

const sdk = require("node-appwrite");
const { InputFile } = require("node-appwrite/file");

/**
 * Uploads a local file (server-side) to Appwrite storage.
 * This must be called from within a server handler (no top-level usage).
 */
export async function uploadFileFromPath(
  filePath: string,
  opts?: { bucketId?: string; fileId?: string; fileName?: string },
) {
  const bucketId =
    opts?.bucketId ??
    process.env.APPWRITE_BUCKET_ID ??
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET;
  if (!bucketId) throw new Error("No bucket id provided (APPWRITE_BUCKET_ID)");

 try{
   const client = await getServerClient();
  const storageClient = await storage();

  const nodeFile = InputFile.fromPath(filePath, opts?.fileName ?? undefined);

  const createResult = await storageClient.createFile({
    bucketId,
    fileId: opts?.fileId ?? sdk.ID.unique(),
    file: nodeFile,
  });

  return createResult;
}catch(error){console.error(error," Upload file from path failed - storage.ts")}
}
