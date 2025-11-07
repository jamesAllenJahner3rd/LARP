"use server";
import { ID, Permission, Role } from "appwrite";
// import { revalidatePath } from "next/cache";
import { getAuthenticatedAccount } from "@/lib/appwrite";
export async function updateUserPassword(formData: FormData): Promise<void> {
  const password: string = formData.get("newPassword") as string;
  const duplicatePassword: string = formData.get("duplicatePassword") as string;
  const oldPassword: string = formData.get("currentPassword") as string;
  //Validation password
  validatePassword(password);
  validatePassword(oldPassword);
  const account = getAuthenticatedAccount();
  const result = await account.updatePassword({
    password,
    oldPassword, // optional
  });
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
