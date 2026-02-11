"use server";
import { AppError } from "@/lib/errors/AppError";
import { getAuthenticatedAccount, listSessions, } from "@/lib/appwrite-node";
import { Client, Account, Storage, Users, type Models } from "node-appwrite";
/**
 * getUserList(formData)
 * Purpose:
 * This action is used to update the authenticated user's email in Appwrite.
 *
 * Responsibilities:
 *  - Validate form inputs(email,confirmation,password)
 *  - Ensure the new and confirmed emails match
 *  -  Call Appwrite's `account.updateEmail` method
 *  Returns:
 *  -   {success:true} on success
 *  Dependencies:
 *  -   Appwrite SDK ("account")
 *  */
export async function getSessions(userid): Promise<Models.SessionList> {

  try {
    const list = await listSessions(userid)
    return (list)
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to server,unable to get session list.");
  }
}
