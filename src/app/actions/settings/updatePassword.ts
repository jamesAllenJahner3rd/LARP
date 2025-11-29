"use server";
import { ID, Permission, Role } from "node-appwrite";
import { getAuthenticatedAccount } from "@/lib/appwrite-node";
/**
 *  updateUserPassword(formData)
 * Purpose:
 * This action is used To update the user's password
 *
 * * Responsibilities:
 *  - Validate password strength and match
 *  - Call Appwrite's `account.updatePassword()` to update the user's password
 *
 *  Returns:
 *  -   void
 *
 * validatePassword(password)
 * Purpose:
 * This action is used Verify the password is acceptable.
 *
 * Responsibilities:
 *  - Validate form input - password
 *  - Alert the user if if there's any spaces, password is too short, has the correct number Character types.
 *
 *  Returns:
 *  -   {string} on success *
 *
 *  Dependencies:
 *  -   Appwrite SDK ("account")
 *  */
export async function updateUserPassword(formData: FormData): Promise<void> {
  const password = formData.get("newPassword") as string;
  const duplicatePassword = formData.get("duplicatePassword") as string;
  const oldPassword = formData.get("currentPassword") as string;

  const error = validatePassword(password);
  if (error) throw new Error(error);

  const oldError = validatePassword(oldPassword);
  if (oldError) throw new Error(oldError);

  if (password !== duplicatePassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    const account = await getAuthenticatedAccount();
    await account.updatePassword({ password, oldPassword });
  } catch (err) {
    console.error("Password update failed:", err);
    throw new Error(
      "Failed to update password. Please check your credentials and try again.",
    );
  }
}
function validatePassword(password: string): string | null {
  if (password.trim() !== password)
    return "No leading or trailing spaces allowed.";
  if (password.includes(" ")) return "Passwords cannot contain spaces.";
  if (password.length < 12) return "Password must be at least 12 characters.";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Include at least one lowercase letter.";
  if (!/\d/.test(password)) return "Include at least one number.";
  if (!/[\W_]/.test(password)) return "Include at least one symbol.";
  return null;
}
