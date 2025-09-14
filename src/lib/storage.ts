import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
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
// export async function uploader(bucketId: string, fileId: string) {
//   const result = await storage.createFile({
//     bucketId: '<BUCKET_ID>',
//     fileId: '<FILE_ID>',
//     file: document.getElementById('uploader').files[0],
//     permissions: ["read("any")"] // optional

// })}
