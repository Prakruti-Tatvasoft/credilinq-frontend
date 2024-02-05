import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ListItemIcon, ListItemText } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CheckIcon from "@mui/icons-material/Check";
import { UploadFile, Header, Footer, FileList } from "@/components";
import { healthCheckSchema } from "@/schemas/healthCheck.schema";
import {
  fileUploadConditions,
  termsAndConditions,
} from "@/utils/constants/consts";
import { addHealthFormMutation } from "./healthCheck.graphql";

const HealthCheck = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  const initialValues = {
    step1: {
      companyUEN: "",
      companyName: "",
    },
    step2: {
      name: "",
      position: "",
      email: "",
      reEmail: "",
      phone: "",
    },
    step4: { isConditionsAccepted: false },
  };

  const [executeMutation, { loading }] = useMutation(addHealthFormMutation);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: healthCheckSchema,
    onSubmit: (values) => {
      const {
        step1: { companyName, companyUEN },
        step2: { name, phone, position, email },
      } = values;
      executeMutation({
        variables: {
          input: { companyName, companyUEN, name, phone, position, email },
          file: files,
        },
      })
        .then(() => {
          router.push("/thankYou");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  });

  const isStep2Disabled = useMemo(
    () => Boolean(errors.step1) || values?.step1 === initialValues?.step1,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors.step1, values?.step1]
  );

  const isStep3Disabled = useMemo(
    () =>
      isStep2Disabled ||
      Boolean(errors.step2) ||
      values?.step2 === initialValues?.step2,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStep2Disabled, errors.step2, values?.step2]
  );

  const isStep4Disabled = useMemo(
    () => isStep2Disabled || isStep3Disabled || files?.length === 0,
    [isStep2Disabled, isStep3Disabled, files]
  );

  const onContactValueChange = (value) => {
    setFieldValue("step2.phone", value, true);
  };

  // Function for remove uploaded file
  const handleRemoveFile = (path) => {
    const updatedFiles = files.filter((file) => file.path !== path);
    setFiles(updatedFiles);
  };

  return (
    <>
      <Header />
      <section className="healthcheck-form-section">
        <div className="container">
          <div className="form-wrap">
            <form onSubmit={handleSubmit}>
              <div className="form-steps-list">
                <div
                  className={`step-wrap ${!isStep2Disabled ? "active" : ""}`}
                >
                  <div className="step-title-block">Company Information</div>
                  <div className="step-content-block">
                    <div className="form-group-wrap">
                      <div className="form-group">
                        <TextField
                          label="Company UEN"
                          variant="outlined"
                          className="form-control"
                          name="step1.companyUEN"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step1?.companyUEN}
                          error={
                            touched?.step1?.companyUEN &&
                            Boolean(errors?.step1?.companyUEN)
                          }
                          helperText={
                            touched.step1?.companyUEN &&
                            errors.step1?.companyUEN
                          }
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          label="Company Name"
                          variant="outlined"
                          className="form-control"
                          name="step1.companyName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step1?.companyName}
                          error={
                            touched.step1?.companyName &&
                            Boolean(errors.step1?.companyName)
                          }
                          helperText={
                            touched.step1?.companyName &&
                            errors.step1?.companyName
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`step-wrap ${!isStep3Disabled ? "active" : ""}`}
                >
                  <div className="step-title-block">Applicant Information</div>
                  <div className="step-content-block">
                    <div className="form-group-wrap">
                      <div className="form-group">
                        <TextField
                          label="Full Name"
                          variant="outlined"
                          className="form-control"
                          name="step2.name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step2?.name}
                          disabled={isStep2Disabled}
                          error={
                            touched.step2?.name && Boolean(errors.step2?.name)
                          }
                          helperText={touched.step2?.name && errors.step2?.name}
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          label="Position Within Company"
                          variant="outlined"
                          className="form-control"
                          name="step2.position"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step2?.position}
                          disabled={isStep2Disabled}
                          error={
                            touched.step2?.position &&
                            Boolean(errors.step2?.position)
                          }
                          helperText={
                            touched.step2?.position && errors.step2?.position
                          }
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          type="email"
                          label="Email"
                          variant="outlined"
                          className="form-control"
                          name="step2.email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step2?.email}
                          disabled={isStep2Disabled}
                          error={
                            touched.step2?.email && Boolean(errors.step2?.email)
                          }
                          helperText={
                            touched.step2?.email && errors.step2?.email
                          }
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          label="Re-enter Email Address"
                          variant="outlined"
                          className="form-control"
                          name="step2.reEmail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.step2?.reEmail}
                          disabled={isStep2Disabled}
                          error={
                            touched.step2?.reEmail &&
                            Boolean(errors.step2?.reEmail)
                          }
                          helperText={
                            touched.step2?.reEmail && errors.step2?.reEmail
                          }
                        />
                      </div>
                      <div className="form-group mob-number">
                        <MuiPhoneNumber
                          name="step2.phone"
                          label="Mobile Number"
                          defaultCountry="sg"
                          variant="outlined"
                          fullWidth
                          value={values?.step2?.phone}
                          onChange={(value) => onContactValueChange(value)}
                          onlyCountries={["sg", "gb", "in", "au"]}
                          onBlur={handleBlur}
                          disabled={isStep2Disabled}
                          error={
                            touched.step2?.phone && Boolean(errors.step2?.phone)
                          }
                          helperText={
                            touched.step2?.phone && errors.step2?.phone
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`step-wrap ${files.length ? "active" : ""}`}>
                  <div className="step-title-block">Upload Document</div>
                  <div className="step-content-block">
                    <div className="file-upload-block">
                      <div className="upload-block">
                        <UploadFile
                          disabled={isStep3Disabled}
                          totalFiles={files}
                          addFiles={setFiles}
                        />
                      </div>
                      <div className="info-list-block">
                        <List>
                          {fileUploadConditions.map((item, index) => {
                            return (
                              <ListItem alignItems="flex-start" key={index}>
                                <ListItemIcon sx={{ minWidth: "40px" }}>
                                  <CheckIcon />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{ opacity: 0.6 }}
                                  primary={item}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    </div>
                    <div className="uploaded-file-list">
                      <FileList
                        uploadedFiles={files}
                        onRemoveFile={handleRemoveFile}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`step-wrap ${
                    values?.step4?.isConditionsAccepted ? "active" : ""
                  }`}
                >
                  <div className="step-title-block">Term & Conditions</div>
                  <div className="step-content-block">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={values?.step4?.isConditionsAccepted}
                          onChange={(e) => {
                            setFieldValue(
                              "step4.isConditionsAccepted",
                              !values?.step4?.isConditionsAccepted
                            );
                          }}
                          onBlur={handleBlur}
                          name="step4.isConditionsAccepted"
                          disabled={isStep4Disabled}
                        />
                      }
                      className="checkbox-item"
                      label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
                    />
                    <List>
                      {termsAndConditions.map((item, index) => {
                        return (
                          <ListItem alignItems="flex-start" key={index}>
                            <ListItemIcon sx={{ minWidth: "50px" }}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                              sx={{ opacity: 0.6 }}
                              primary={item}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </div>
              </div>
              <div className="btn-wrap">
                <Button
                  variant="contained"
                  className="primary-btn"
                  type="submit"
                  disabled={
                    isStep2Disabled ||
                    isStep3Disabled ||
                    files?.length === 0 ||
                    isStep4Disabled ||
                    !values?.step4?.isConditionsAccepted ||
                    loading
                  }
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HealthCheck;
