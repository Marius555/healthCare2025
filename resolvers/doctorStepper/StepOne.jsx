
import * as yup from "yup";

// Step One Schema
export const stepOneSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup
    .string()
    // Match phone numbers with optional spaces and + at the beginning
    .matches(
      /^(\+?\d{1,3}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?[\d\s-]{7,}$/,
      "Phone number must contain only digits, spaces, and a valid format"
    )
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  nationality: yup.string().required("Nationality is required"),
  type: yup.string().required("Type is required"),
  userId: yup.string().required("userId is required"),
  pictureName: yup.array()
  .of(yup.string().required("Each picture name must be a string")),

  birthDay: yup
    .date("Date Must Be Valid")
    .required("Date of birth is required")
    .nullable("Date of birth is required"),
});