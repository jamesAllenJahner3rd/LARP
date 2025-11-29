"use server";
import { AppError } from "@/lib/errors/AppError";
import { getAuthenticatedAccount } from "@/lib/appwrite-node";

/**
 * updateUserEmail(formData)
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
export async function updateUserEmail(formData: FormData): Promise<void> {
  const updatedEmail: string = formData.get("newEmail") as string;

  const retypedEmail: string = formData.get("duplicateEmail") as string;
  const password: string = formData.get("password") as string;
  if (!updatedEmail || !retypedEmail || !password.trim()) {
    throw new Error("All fields are required.");
  }
  if (retypedEmail !== updatedEmail) {
    throw new AppError(
      "EMAIL _MAISMATCH",
      "Your confirmation email doesn't match",
    );
  }
  try {
    const account = await getAuthenticatedAccount();
    const result = await account.updateEmail({
      email: updatedEmail,
      password: password,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the Email.");
  }
}
