import { Client, Account, Databases } from "appwrite";

const client = new Client();

if (typeof window !== "undefined") {
  client
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
}

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };