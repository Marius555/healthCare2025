"use server";

import { createAdminClient } from "@/AppwriteServer";
import { cookies } from "next/headers";
import appwriteCheckIfDoctorExists from "./appwriteCheckIfDoctorExists";

export async function AppwriteLoginServer(data) {
  try {
    const email = await data.email.trim();
    const password = await data.password;

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    const cookieStore = await cookies();
    cookieStore.set("appSession", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    if (session.secret) {
      const check = await appwriteCheckIfDoctorExists(session?.userId);
      return { success: true, message: "User Login Successfully", type: check.type, collectionId: check.$id };
    }
    return { success: true, message: "User Login Successfully" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
