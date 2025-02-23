import * as yup from "yup";

export const stepTwoSchema = yup.object().shape({
  university: yup.string().required("University is required"),
  studiesBegin: yup
    .string()
    .required("date is required"),
  studiesEnd: yup
    .string()
    .required("Graduation date is required")
    .test(
      "is-after-start",
      "Graduation date must be after start of studies date",
      function (value) {
        const { studiesBegin } = this.parent;
        return !studiesBegin || !value || parseInt(value) > parseInt(studiesBegin);
      }
    ),
  userId: yup.string().required("userId is required"),
  specialization: yup.string().required("Specialization is required"),
  degree: yup.string().required("Degree level is required"),
  licenseNumber: yup
    .string()
    .required("License number is required")
    .min(5, "License number must be at least 5 digits")
    .max(15, "License number must not exceed 15 digits"),
});