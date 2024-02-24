import { useState, useEffect, useCallback } from "react";
import React, { useContext } from "react";
import close from "../../assets/images/close.svg";
import closeDark from "../../assets/images/closeDark.svg";
import "./Style.scss";
import Alert from "@mui/material/Alert";
import { TextField } from "@material-ui/core";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Google from "../../assets/images/Google.svg";
import useAxios from "axios-hooks";
import MiniLogoii from "../../assets/images/miniLogoii.svg";
import MiniLogoiiDark from "../../assets/images/miniLogoiiDark.svg";
import ThemeContext from "@/themeContext/themeContext";
import { Box } from "@mui/material";
import CustomToaster from "@/components/CustomToaster";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/loader/loader";
import GoogleIcon from "../../assets/images/googleIcon.svg";
import GoogleIconDark from "../../assets/images/googleIconDark.svg";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../assets/images/appleIcon.svg";
import AppleIconDark from "../../assets/images/appleIconDark.svg";
import axios from "axios";

interface formDataType {
  email: string;
  password: string;
}
type errorDataType = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const initialValue = { email: "", password: "" };
  const navigate = useNavigate();
  const [authResponse, setAuthResponse] = useState({});
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Pasword must be 8 or more characters")
      .required("Password is required"),
  });

  React.useEffect(() => {
    document.body.classList.add("chat-mobile-wrapper");

    return () => {
      document.body.classList.remove("chat-mobile-wrapper");
    };
  }, []);

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      }
    },
    //  eslint-disable-next-line
    []
  );

  const onFormSubmit = (values: formDataType, resetForm: any) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    makeRequest({
      url: `/auth/login`,
      data: formData,
      method: "post",
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "sessions",
          JSON.stringify(response.data.user.sessions)
        );
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response?.data?.user?.is_registration_complete) {
          navigate("/dashboard");
        } else {
          navigate("/tips");
        }
        resetForm({
          values: { email: "", password: "" },
        });
        // if(response?.data?.)
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

  const googleSignIn = useCallback(
    () => {
      makeRequest(`auth/google/get-url`)
        .then((response: any) => {
          const popup = window.open(
            response.data.login_url,
            "_blank",
            "popup=true"
          );
          var leftDomain = false;
          var interval = setInterval(() => {
            try {
              if (popup && popup.document.domain === document.domain) {
                if (
                  leftDomain &&
                  popup.document.readyState === "complete" &&
                  popup.window.location.href.includes("code")
                ) {
                  clearInterval(interval);
                  const params = new URL(popup.window.location as any)
                    .searchParams;
                  const code = params.get("code");
                  if (code) {
                    navigate({
                      pathname: "/sign-google",
                      search: createSearchParams({
                        code: code,
                      }).toString(),
                    });
                  }
                  popup!.close();
                }
              } else {
                leftDomain = true;
              }
            } catch (e) {
              if (popup && popup.closed) {
                clearInterval(interval);
                return;
              }
              leftDomain = true;
            }
          }, 500);
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
    },
    //  eslint-disable-next-line
    []
  );
  const { theme } = useContext(ThemeContext);

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  interface response {
    response: string | "No Response";
  }

  const appleResponse = (response: any) => {
    console.log("APPLE RESPONSE: ", response);
    if (!response.error) {
      let access_code = response.authorization.code;
      // let id_token = response.authorization.id_token;
      axios
        .post<response>(
          `auth/apple/login`,
          { access_code: access_code },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response: any) => {
          if (response.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          onFormSubmit(values, resetForm);
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <>
            <div className="sign-in-wrapper">
              <div className="signin-form-wrapper">
                <CustomToaster
                  isShown={toasterState.isShown}
                  handleClose={handleToasterClose}
                  message={toasterState.message}
                  messageType={toasterState.messageType}
                />

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
                      onClick={() => navigate("/")}
                    />
                  </Box>
                </div>
                <div className="auth-form">
                  <div
                    className={
                      theme === "light" ? "circle-light" : "circle-dark"
                    }
                  >
                    {/* <img src={circleLogo} alt="" /> */}
                  </div>

                  {/* {error && <Alert severity="error">{error}</Alert>} */}

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
                      />
                      {errors.email && touched.email ? (
                        <Box className="error-message">{errors?.email}</Box>
                      ) : null}
                    </div>
                    <div className="field-container">
                      <TextField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <Box className="error-message">{errors?.password}</Box>
                      ) : null}
                    </div>

                    <Box
                      sx={{ cursor: "pointer" }}
                      className="forget-password"
                      onClick={() => navigate("/forgot-password")}
                    >
                      forgot password?
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      className="light-theme-btn"
                    >
                      Log in
                    </Button>
                  </Form>

                  {/* <div className="additional-actions">
            {" "}
            Don't have an account?&nbsp;
            <Link to="/sign-up">Sign up</Link>
          </div> */}
                  <div className="google-wrapper">
                    <div>
                      <button onClick={googleSignIn}>
                        <img
                          src={theme === "light" ? GoogleIcon : GoogleIconDark}
                          alt=""
                        />{" "}
                        Google
                      </button>
                    </div>

                    {/* <img src={Google} alt="google" onClick={googleSignIn} /> */}
                  </div>
                  <div className="google-wrapper">
                    <div>
                      <AppleLogin
                        clientId="com.gaiiachat"
                        redirectURI="https://gaiia.chat"
                        usePopup={true}
                        callback={appleResponse} // Catch the response
                        scope="email"
                        responseType="code id_token"
                        responseMode="form_post"
                        render={(
                          renderProps //Custom Apple Sign in Button
                        ) => (
                          <button onClick={renderProps.onClick}>
                            <img
                              src={
                                theme === "light" ? AppleIcon : AppleIconDark
                              }
                              alt=""
                            />{" "}
                            &nbsp;&nbsp;Apple
                          </button>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
