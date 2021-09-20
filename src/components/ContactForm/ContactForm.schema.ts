import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  emails: Yup.array().of(
    Yup.string()
      .email("Invalid email")
      .max(254, "Too long!")
      .required("Required")
  ),
});
