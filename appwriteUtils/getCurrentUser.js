"use server"
import { createSessionClient } from "@/AppwriteServer";

export async function GetLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get()
      return { success: true, user: user };
    } catch (error) {
        return { success: false, message: error.message || "An error occurred" };
    }
}