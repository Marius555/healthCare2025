import { Client, Account, ID, Databases, Storage } from 'appwrite';



const appConfig = {
  databaseId: "67a45a6c0038238a847c",
  doctorCollectionId: "67a45a81000e4fc3bc96",
  bucket: "67a5286700233cd15f95",
  doctorEducationId: "67a6ac390011c393139a",
  DoctorCompanyId: "67afe006002e570e92c6"
}

const client = new Client();
client.setProject('6791f8bb0019d5f7763d');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (data) => {
    try {
      const em = await data.email.trim();
      const name = await em.split("@");
      await account.create(ID.unique(), em, data.password, name[0]);
      return { success: true, message: "User created successfully" };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  export const loginWithEmail = async (data) => {
    try {
      const promise = await account.createEmailPasswordSession(data.email, data.password);
      return { success: true, message: "Login Successfull", data:  promise };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  export const CreateNewDoctor = async (data) => {
    try {
      const promis = await databases.createDocument(
        appConfig.databaseId,
        appConfig.doctorCollectionId,
        ID.unique(),
        {
          name: data.name,
          lastname: data.lastName,
          phoneNumber: data.phoneNumber,
          nationality: data.nationality,
          birthDay: data.birthDay,
          type: data.type,
          userId: data.userId,
          pictureName: data.pictureName
        }
    );
      return { success: true, message: "Doctor was succesfully created", data: promis };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };
  
  export const createProfilePicture = async (data) => {
    try {
      await storage.createFile(
        appConfig.bucket,
        ID.unique(),
        data
    )
      return { success: true, message: "File submited successfully" };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  export const CreateNewDoctorEducation = async (data) => {
    try {
       await databases.createDocument(
        appConfig.databaseId,
        appConfig.doctorEducationId,
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
      return { success: true, message: "Education Was successfully added" };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  export const CreateNewDoctorCompany = async (data) => {
    try {
      await databases.createDocument(
        appConfig.databaseId,
        appConfig.DoctorCompanyId,
        ID.unique(),
        {
          country: data.country,
          multipleJobs: data.multipleJobs,
          experience: data.experience,
          workDescription: data.workDescription,
          userId: data.userId,
        }
    );
      return { success: true, message: "Company was succesfully added to your profile" };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };