"use server";
import { Client, Account, Storage, TablesDB } from "node-appwrite";
export async function getAuthenticatedAccount(): Promise<Account> {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return new Account(client);
}
export async function getClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return client;
}
export async function UserLogin(email: string, password: string) {
  try {
    const account = await getAuthenticatedAccount();

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

export async function storage() {
  const client = await getClient();
  return new Storage(client);
}
