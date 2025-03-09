import { cookies } from "next/headers";

const GetIdFromCookie = async() => {
 try {
    const getting = await cookies();
    const cook = getting.get('appSession').value
    if (!cook) {
      return { success: false, message: "no cookie found" };
    }
    const decoded = Buffer.from(cook, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    const id = parsed?.id;
    console.log(id)
    return { success: true, id };
 } catch (error) {
    return { success: false, message: error.message || "An error occurred processing" };
 }
};

export default GetIdFromCookie;
