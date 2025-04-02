"use server";

import { createSessionClient } from "@/AppwriteServer";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

const CreateNewDoctorEducationServer = async (data) => {
  const cookieStore = await cookies();
  try {
    const { databases } = await createSessionClient();

    if (!databases) {
      throw new Error("Failed to initialize databases client");
    }
    const education  = await databases.createDocument(
      process.env.DATABASE_ID,
      process.env.DOCTOR_EDUCTATION_ID,
      ID.unique(),
      {
        university: data.university,
        studiesBegin: data.studiesBegin,
        studiesEnd: data.studiesEnd,
        specialization: data.specialization,
        degree: data.degree,
        licenseNumber: data.licenseNumber,
        userId: data.userId,
      }
    );
    const doctorId = await cookieStore.get("userCollectionId");
    await databases.updateDocument(
      process.env.DATABASE_ID, 
      process.env.DOCTOR_COLLECTION_ID, 
      doctorId.value, 
      {
        Education: [education.$id]
      }
    );

    return { success: true, message: "Education Was successfully added" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
};
export default CreateNewDoctorEducationServer;
