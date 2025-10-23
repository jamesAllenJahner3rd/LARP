import { Client, Account, Storage, TablesDB } from "appwrite";

const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://nyc.cloud.appwrite.io/v1",
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
export const account = new Account(client);
export { ID } from "appwrite";
export const storage = new Storage(client);
export const tablesDB = new TablesDB(client);
