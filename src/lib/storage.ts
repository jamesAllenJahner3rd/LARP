import { storage } from "./appwrite"; // uses your existing client

export async function getFileURL(bucketId: string, fileId: string) {
  try {
    const result = await storage.getFileView(bucketId, fileId);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Failed to get file download URL:", error);
    throw error;
  }
}
