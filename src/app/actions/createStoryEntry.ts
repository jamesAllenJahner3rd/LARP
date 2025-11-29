// app/actions/createStoryEntry.ts
"use server";

import { postData } from "@/lib/database";
import { ID, Permission, Role } from "appwrite";
import { revalidatePath } from "next/cache";
export async function createStoryEntry(formData: FormData): Promise<void> {
  const heading = formData.get("heading");
  const body = formData.get("newLog");

  if (!heading || !body) throw new Error("Missing fields");
  try {
    await postData(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      "storyentries",
      ID.unique(),
      { heading, body },
      [
        Permission.read(Role.any()),
        //   Permission.write(Role.team("admin")),
        //   Permission.update(Role.team("admin")),
        //   Permission.delete(Role.team("admin")),
      ],
    );
    revalidatePath("/explore/storyline");
  } catch (error) {
    console.error(error, "Error couldn't Post Data - createStoryEntry");
  }
}
