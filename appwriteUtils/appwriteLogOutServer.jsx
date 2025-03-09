"use server";
import { createSessionClient } from "@/AppwriteServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function appwriteLogOutServer() {
  const { account } = await createSessionClient();
  const cookieStore = await cookies()
  cookieStore.delete("appSession");
  await account.deleteSession("current");
  redirect("/")
}
