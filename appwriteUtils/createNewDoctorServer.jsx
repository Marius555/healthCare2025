"use server";

import { createSessionClient } from "@/AppwriteServer";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

const CreateNewDoctorServer = async (data) => {
  try {
    const { databases } = await createSessionClient();

    if (!databases) {
      throw new Error("Failed to initialize databases client");
    }
    const promis = await databases.createDocument(
      process.env.DATABASE_ID,
      process.env.DOCTOR_COLLECTION_ID,
      ID.unique(),
      {
        name: data.name,
        lastname: data.lastName,
        phoneNumber: data.phoneNumber,
        nationality: data.nationality,
        birthDay: data.birthDay,
        type: data.type,
        userId: data.userId,
        pictureName: data.pictureName,
      }
    );
    const doctorId = await promis.$id;

     const cookieStore = await cookies();
        cookieStore.set("userCollectionId", doctorId, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

    return {
      success: true,
      message: "Doctor was succesfully created",
      doctorId: doctorId
    };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
};
export default CreateNewDoctorServer;