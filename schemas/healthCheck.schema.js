import * as Yup from "yup";

export const healthCheckSchema = Yup.object({
  step1: Yup.object({
    companyUEN: Yup.string().required("Company UEN is required"),
    companyName: Yup.string().required("Company Name is required"),
  }),
  step2: Yup.object({
    name: Yup.string().required("Full Name is required"),
    position: Yup.string().required("Position is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    reEmail: Yup.string()
      .email("Enter a valid email")
      .required("Email is required")
      .test("emails-match", "Emails must match", function (value) {
        return value === this.parent.email;
      }),
    phone: Yup.string().required("Mobile Number is required"),
  }),
  step4: Yup.object({
    isConditionsAccepted: Yup.bool().required(
      "Please accept terms and condition"
    ),
  }),
});
