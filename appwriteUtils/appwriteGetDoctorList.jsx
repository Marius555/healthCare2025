import { createSessionClient } from "@/AppwriteServer";

const appwriteGetDoctorList = async () => {
  try {
    const { databases } = await createSessionClient();
    if (!databases) {
      throw new Error("Failed to initialize databases client");
    }

    const databaseId = process.env.DATABASE_ID;
    const collectionId = process.env.DOCTOR_COLLECTION_ID;
    const doctorList = await databases.listDocuments(databaseId, collectionId);
    return { success: true, data: doctorList };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to get doctor list",
    };
  }
};

export default appwriteGetDoctorList;
