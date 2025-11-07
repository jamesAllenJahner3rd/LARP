"use server";

import { getClient } from "@/lib/appwrite";
import { Client, Query, TablesDB } from "appwrite";

export async function getCharacters() {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
        "https://nyc.cloud.appwrite.io/v1",
    )
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68bb084a0032b02608c4",
    );
  const tableDB = new TablesDB(client);
  const characterList = await tableDB.listRows({
    databaseId: "68c1161d0005b831d8b7",
    tableId: "characters",
    queries: [Query.equal("memberId", "68ccbf0f0026eb9a8d4f")], // optional
    // transactionId: '<TRANSACTION_ID>' // optional
  });

  return await characterList;
}
