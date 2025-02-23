import * as yup from "yup";

export const stepThreeSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  companyWebsite: yup
  .string()
  .transform((value) => {
    if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
      return `https://${value}`;
    }
    return value;
  })
  .url("Enter a valid URL")
  .required("Company website is required"),
  workDescription: yup
    .string()
    .required("Work description is required")
    .min(30, "To short description")
    .max(500, "Description cannot exceed 500 characters"),
  startWorking: yup.string().required("Please select a start year"),
  primaryWorkplace: yup.boolean().default(false), // Boolean checkbox
  userId: yup.string().required("userId is required"),
});