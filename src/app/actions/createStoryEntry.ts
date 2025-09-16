// app/actions/createStoryEntry.ts
"use server";

import { postData } from "@/lib/database";
import { ID, Permission, Role } from "appwrite";

export async function createStoryEntry(formData: FormData): Promise<void> {
  const heading = formData.get("heading");
  const body = formData.get("newLog");
  console.dir(formData);
  console.dir(heading);
  console.dir(body);

  if (!heading || !body) throw new Error("Missing fields");

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
}
