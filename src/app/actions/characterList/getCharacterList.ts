"use server";

import { getClient, getAuthenticatedAccount } from "@/lib/appwrite-node";
import { Client, Query, TablesDB } from "node-appwrite";

export async function getCharacters() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  const tableDB = new TablesDB(client);
  const characterList = await tableDB.listRows({
    databaseId: "68ccc1ab0001250042a8",
    tableId: "characters",
    queries: [Query.equal("memberId", "12345678912345678912")], // optional
    // transactionId: '<TRANSACTION_ID>' // optional
  });

  return await characterList;
}
