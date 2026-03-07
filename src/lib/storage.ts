import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import { storage, getServerClient } from "./appwrite-node"; // uses your existing client
import { InputFile } from "node-appwrite/file";
import { ID } from "node-appwrite";
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
    return file;
  } catch (error) {
    console.error("Failed to get file download URL:", error);
    throw error;
  }
}
