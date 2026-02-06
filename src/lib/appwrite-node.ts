"use server";
import { Client, Account, Storage, TablesDB } from "node-appwrite";
export async function getAuthenticatedAccount(): Promise<Account> {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return new Account(client);
}
export async function getServerClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return client;
}
export async function storage() {
  const client = await getServerClient();
  return new Storage(client);
}
