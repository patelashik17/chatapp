import { useState } from "react";
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
import Loader from "@/components/loader/loader";

interface formDataType {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}
type errorDataType = {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
};
const ContactUs = () => {
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });

  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  const navigate = useNavigate();

  const onFormSubmit = (values: formDataType, resetForm: any) => {
    const formData = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      message: values?.message,
    };
    makeRequest({
      url: `/contact-us`,
      data: formData,
      method: "post",
    })
      .then((response) => {
        setToasterState({
          isShown: true,
          message: response?.data?.message,
          messageType: "success",
        });
        resetForm({
          values: { first_name: "", last_name: "", email: "", message: "" },
        });
      })
      .catch((error) => {
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

  const onLogoClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  React.useEffect(() => {
    document.body.classList.add("chat-mobile-wrapper");

    return () => {
      document.body.classList.remove("chat-mobile-wrapper");
    };
  }, []);

  const { theme } = useContext(ThemeContext);

  const ContactUsSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <>
      {loading && <Loader />}

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          message: "",
        }}
        validationSchema={ContactUsSchema}
        onSubmit={(values, { resetForm }) => {
          onFormSubmit(values, resetForm);
          // resetForm({
          //   values: { first_name: "", last_name: "", email: "", message: "" },
          // });
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <div className="contact-us-wrapper">
            <CustomToaster
              isShown={toasterState.isShown}
              handleClose={handleToasterClose}
              message={toasterState.message}
              messageType={toasterState.messageType}
            />

            <div className="contactus-form-wrapper">
              <div className="logo">
                <Box sx={{ cursor: "pointer" }}>
                  <img
                    src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
                    className="logo-icon"
                    alt="logo"
                    onClick={() => onLogoClick()}
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
                <div className="title">we’d love to hear from you!</div>
                <p className="description">
                  We aim to get back to you within 24 hours. Feel free to fill
                  out the form right here, or send us an email at{" "}
                  <b>hello@gaiia.chat</b>
                </p>
                {/* {error && <Alert severity="error">{error}</Alert>} */}

                <Form
                  onSubmit={handleSubmit}
                  className={Object.keys(errors) ? "formError form" : "form"}
                >
                  <div className="input-container">
                    <div>
                      <TextField
                        id="outlined-basic1"
                        label="first name"
                        variant="outlined"
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        className="mobile-responsive-input"
                      />
                      {errors.first_name && touched.first_name ? (
                        <Box className="error-message">
                          {errors?.first_name}
                        </Box>
                      ) : null}
                    </div>

                    <div>
                      <TextField
                        id="outlined-basic1"
                        label="last name"
                        variant="outlined"
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        className="mobile-responsive-input"
                      />
                      {errors.last_name && touched.last_name ? (
                        <Box className="error-message">{errors?.last_name}</Box>
                      ) : null}
                    </div>
                  </div>
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
                      className="mobile-responsive-input"
                    />
                    {errors.email && touched.email ? (
                      <Box className="error-message">{errors?.email}</Box>
                    ) : null}
                  </div>
                  <div className="field-container">
                    <TextField
                      id="outlined-basic"
                      label="message"
                      variant="outlined"
                      type="text"
                      name="message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      minRows={3}
                      maxRows={5}
                      multiline
                      value={values?.message}
                    />
                    {errors.message && touched.message ? (
                      <Box className="error-message">{errors?.message}</Box>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    className="light-theme-btn"
                  >
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

export default ContactUs;
