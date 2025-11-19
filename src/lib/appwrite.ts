"use client";
import { Client, Account, Storage, TablesDB, Models } from "appwrite";
export function getAuthenticatedAccount(): Account {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
        "https://nyc.cloud.appwrite.io/v1",
    )
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68bb084a0032b02608c4",
    );

  return new Account(client);
}
export function getClient() {
  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
}
export async function UserLogin(email: string, password: string) {
  try {
    const account = getAuthenticatedAccount();

    // account.deleteSessions();
    // const session = account.createEmailPasswordSession(email, password);
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get(); //added
    return currentUser;
    // return session;
  } catch (error) {
    console.error("An Error occured", error);
    throw error;
  }
}

export function storage() {
  const client = getClient();
  return new Storage(client);
}

export async function getList(
  dbId: string,
  tableId: string,
): Promise<Models.RowList<Models.DefaultRow>> {
  try {
    const client = getClient();
    const tablesDB = new TablesDB(client);
    const result = await tablesDB.listRows(dbId, tableId);
    console.log("Table was found:", dbId);

    return await result;
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
}
