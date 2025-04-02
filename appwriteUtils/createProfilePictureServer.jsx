"use server";

import { createSessionClient } from "@/AppwriteServer";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

const CreateProfilePictureServer = async (data) => {
  try {
    const cookieStore = await cookies();
    const userCollectionId = cookieStore.get("userCollectionId");

    const { storage, databases } = await createSessionClient()
    if (!storage) {
        throw new Error("Failed to initialize databases client");
      }

    const pictureData = await storage.createFile(process.env.BUCKET, ID.unique(), data);

    await databases.updateDocument(
        process.env.DATABASE_ID, 
        process.env.DOCTOR_COLLECTION_ID, 
        userCollectionId.value, 
        {
            pictureName: [pictureData.$id]
        }
      );
    return { success: true, message: "File submited successfully" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
};

export default CreateProfilePictureServer;
