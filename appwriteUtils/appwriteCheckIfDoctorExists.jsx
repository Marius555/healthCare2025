import { createSessionClient } from "@/AppwriteServer"
import { Query } from "appwrite";

const appwriteCheckIfDoctorExists = async(userId) => {
    const { databases } = await createSessionClient();
  
    if (!databases) {
      throw new Error("Failed to initialize databases client");
    }
    const databaseId = process.env.DATABASE_ID;
    const collectionId = process.env.DOCTOR_COLLECTION_ID;

    try {
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('userId', userId)
        ]);
    
        if (response.documents.length > 0) {
          return response.documents[0];
        } else {
          return null;
        }
      } catch (error) {
        console.error('Failed to fetch doctor:', error);
        throw error;
      }
}

export default appwriteCheckIfDoctorExists
