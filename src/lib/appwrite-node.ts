"use server";
import { Client, Account, Storage, Users, type Models } from "node-appwrite";
export async function getAuthenticatedAccount(): Promise<Account> {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    return new Account(client);
  } catch (err) {
    console.error(err, "Failed to get account")
  }
}
export async function getServerClient() {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);
    return client;
  } catch (err) {
    console.error(err, "Failed to get client")
  }
}

export async function storage() {
  try {
    const client = await getServerClient();
    return new Storage(client);

  } catch (err) {
    console.error(err, "Failed to find Storage")

  }
}
export async function getUserList(search?: string) {
  try {
    const client = await getServerClient()
    const users = new Users(client)

    const params: any = {
      queries: [],
      total: true
    }

    if (search && search.length > 0) {
      params.search = search
    }

    const response = await users.list(params)
    return response

  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
export async function updateEmail(userId: string, email: string) {
  try {
    const client = await getServerClient();
    const user = new Users(client);
    const response = await user.updateEmail({
      userId: normalizeString(userId),
      email: normalizeString(email

      ),
    })
    return (response)
  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
export async function updateName(userId: string, name: string) {
  try {
    const client = await getServerClient();
    const user = new Users(client);
    const response = await user.updateName({
      userId: normalizeString(userId),
      name,
    })
    return (response)
  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
export async function updatePassword(userId: string, password: string) {
  try {
    const client = await getServerClient();
    const user = new Users(client);
    const response = await user.updatePassword({
      userId: normalizeString(userId),
      password,
    })
    return (response)
  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
export async function updateLabels(userId: string, labels: string[]) {
  try {
    const client = await getServerClient();
    const user = new Users(client);
    const response = await user.updateLabels({
      userId: normalizeString(userId),
      labels,
    })
    return (response)
  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
export async function listSessions(userId: string): Promise<Models.SessionList> {
  try {
    const client = await getServerClient();
    const user = new Users(client);
    const response = await user.listSessions({
      userId: normalizeString(userId),
      total: true
    })
    return (response)
  } catch (err) {
    console.error(err, "Failed to get user list")
  }
}
function normalizeString(input: string): string {
  if (!input) return "";

  return input
    .trim()                                        // 1. Remove leading/trailing spaces
    .normalize("NFKD")                             // 2. Decompose combined characters
    .replace(/\p{Diacritic}/gu, "")                // 3. Strip accents (diacritics)
    .toLowerCase()                                 // 4. Standardize casing
    .replace(/\s+/g, " ")                          // 5. Collapse multiple spaces into one
  // .replace(/[^a-z0-9 ]/g, "");                   // 6. Optional: Remove special characters
}