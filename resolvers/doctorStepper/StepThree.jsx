import * as yup from "yup";

export const stepThreeSchema = yup.object().shape({
  country: yup.string().required("Country selector is required"),
  workDescription: yup
    .string()
    .required("Work description is required")
    .min(30, "To short description")
    .max(500, "Description cannot exceed 500 characters"),
  experience: yup.string().required("experience is selector required"),
  multipleJobs: yup.boolean().default(false), // Boolean checkbox
  userId: yup.string().required("userId is required"),
});