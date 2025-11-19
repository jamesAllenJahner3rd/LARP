"use server";

import { getServerClient } from "@/lib/appwrite-node";
import { Query, TablesDB, Models } from "node-appwrite";

/**
 * getCharacters()
 *
 * Purpose:
 *   Fetches a list of player characters from the Appwrite database.
 *
 * Responsibilities:
 *   - Initializes a server-side Appwrite client.
 *   - Queries the "characters" table for rows matching a specific memberId.
 *   - Returns the full RowList response from Appwrite.
 *
 * Returns:
 *   A RowList object containing the total count and array of character rows.
 *
 * Dependencies:
 *   - node-appwrite TablesDB
 *   - getServerClient() from @/lib/appwrite-node
 */

export async function getCharacters(): Promise<Models.RowList> {
  const client = await getServerClient();
  const tableDB = new TablesDB(client);
  const characterList = await tableDB.listRows({
    databaseId: "68ccc1ab0001250042a8",
    tableId: "characters",
    queries: [Query.equal("memberId", "12345678912345678912")],
  });
  return await characterList;
}
