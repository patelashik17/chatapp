import { useEffect, useState } from "react";
import React, { useContext } from "react";
import close from "../../assets/images/close.svg";
import closeDark from "../../assets/images/closeDark.svg";
import "./Style.scss";
import Alert from "@mui/material/Alert";
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import useAxios from "axios-hooks";
import MiniLogoii from "../../assets/images/miniLogoii.svg";
import MiniLogoiiDark from "../../assets/images/miniLogoiiDark.svg";
import ThemeContext from "@/themeContext/themeContext";
import CustomToaster from "@/components/CustomToaster";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Value } from "sass";
import Loader from "@/components/loader/loader";

interface formDataType {
  email: string;
}
type errorDataType = {
  email: string;
};
const ForgotPassword = () => {
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const initialValue = { email: "" };
  const [formData, setFormData] = useState<formDataType>(initialValue);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState<errorDataType>();
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  console.log("toasterState", toasterState);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors(validation({ ...formData, [name]: value }));
  };

  const validation = (values: formDataType) => {
    const errors = {} as errorDataType;
    if (!values.email) {
      errors.email = "Email Address is required";
    }
    return errors;
  };

  const onFormSubmit = (values: { email: string }, resetForm: any) => {
    const formData = {
      email: values?.email,
    };
    makeRequest({
      url: `/auth/forgot-password`,
      data: formData,
      method: "post",
    })
      .then((response) => {
        setFormData(initialValue);
        resetForm({ values: { email: "" } });
        setToasterState({
          isShown: true,
          message: response?.data?.message,
          messageType: "success",
        });
        if (response.status === 200) {
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        setError(error.response.data.error_message);
        if (error.response.status === 500) {
          setToasterState({
            isShown: true,
            message: "Something Went wrong",
            messageType: "error",
          });
        } else {
          setToasterState({
            isShown: true,
            message: error.response.data.error_message,
            messageType: "error",
          });
        }
      });
  };

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  const ContactUsSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  React.useEffect(() => {
    document.body.classList.add("chat-mobile-wrapper");

    return () => {
      document.body.classList.remove("chat-mobile-wrapper");
    };
  }, []);

  const { theme } = useContext(ThemeContext);
  return (
    <>
      {loading && <Loader />}

      <Formik
        initialValues={{ email: "" }}
        validationSchema={ContactUsSchema}
        onSubmit={(values, { resetForm }) => {
          onFormSubmit(values, resetForm);
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <div className="forgot-pass-wrapper">
            <CustomToaster
              isShown={toasterState.isShown}
              handleClose={handleToasterClose}
              message={toasterState.message}
              messageType={toasterState.messageType}
            />
            <div className="forgot-form-wrapper">
              <div className="logo">
                <Box sx={{ cursor: "pointer" }}>
                  <img
                    src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
                    className="logo-icon"
                    alt="logo"
                    onClick={() => navigate("/")}
                  />
                </Box>

                <Box sx={{ cursor: "pointer" }}>
                  <img
                    src={theme === "light" ? close : closeDark}
                    className="close-icon"
                    alt="logo"
                    onClick={() => navigate(-1)}
                  />
                </Box>
              </div>
              <div className="auth-form">
                <div className="title">Forgot Your Password?</div>
                {/* <p className="description"> </p> */}
                <p className="description">
                  We all forget things from time to time. 
                  <br />
                  If you've misplaced your password, don't worry – we've got you
                  covered. Just enter the <b>email address </b>you used when you
                  joined Gaiia.
                </p>

                <Form
                  className={Object.keys(errors) ? "formError form" : "form"}
                >
                  <div className="field-container">
                    <TextField
                      id="outlined-basic1"
                      label="e-mail"
                      variant="outlined"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.email}
                    />
                    {errors.email && touched.email ? (
                      <Box className="error-message">{errors?.email}</Box>
                    ) : null}
                  </div>

                  <Button type="submit" variant="contained">
                    submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
