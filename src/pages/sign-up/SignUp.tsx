import { useCallback, useState, useContext } from "react";
import "./Style.scss";
import MiniLogoii from "../../assets/images/miniLogoii.svg";
import MiniLogoiiDark from "../../assets/images/miniLogoiiDark.svg";
import ThemeContext from "@/themeContext/themeContext";
import Close from "../../assets/images/close.svg";
import CloseDark from "../../assets/images/closeDark.svg";
import AppleIcon from "../../assets/images/appleIcon.svg";
import GoogleIcon from "../../assets/images/googleIcon.svg";
import AppleIconDark from "../../assets/images/appleIconDark.svg";
import GoogleIconDark from "../../assets/images/googleIconDark.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Checkbox, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import useAxios from "axios-hooks";
import Button from "@/components/Button";
import UsageDisclaimerPopup from "@/components/usageDisclaimerPopup/UsageDisclaimerPopup";
import CustomToaster from "@/components/CustomToaster";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/loader/loader";
import AppleLogin from "react-apple-login";
import axios from "axios";

interface formDataType {
  name: string;
  email: string;
  password: string;
}
type errorDataType = {
  name: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(8, "Password must be 8 or more characters")
      .required("Password is required"),
  });

  const onFormSubmit = (values: formDataType) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    makeRequest({
      url: `/auth/signup`,
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
        navigate("/success");
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

  const googleSignUp = useCallback(
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

  const checkHandler = () => {
    setShowPopup(true);
  };

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  const { theme } = useContext(ThemeContext);
  return (
    <>
      {loading && <Loader />}

      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          onFormSubmit(values);
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <div className="sign-up-wrapper">
            <div className="signup-form-wrapper">
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
                    src={theme === "light" ? Close : CloseDark}
                    className="close-icon"
                    alt="logo"
                    onClick={() =>
                      !showPopup ? navigate(-1) : setShowPopup(!showPopup)
                    }
                  />
                </Box>
              </div>
              {!showPopup ? (
                <div className="auth-form">
                  <div className="title">create your account</div>

                  <div>
                    <Form
                      className={
                        Object.keys(errors).length ? "formError form" : "form"
                      }
                    >
                      <div className="field-container">
                        <TextField
                          id="outlined-basic"
                          label="name"
                          name="name"
                          variant="outlined"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name ? (
                          <Box className="error-message">{errors?.name}</Box>
                        ) : null}
                      </div>

                      <div className="field-container">
                        <TextField
                          id="outlined-basic1"
                          label="e-mail"
                          name="email"
                          variant="outlined"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <Box className="error-message">{errors?.email}</Box>
                        ) : null}
                      </div>

                      <div className="field-container">
                        <TextField
                          id="outlined-basic2"
                          label="Password"
                          name="password"
                          variant="outlined"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <Box className="error-message">
                            {errors?.password}
                          </Box>
                        ) : null}
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        className="light-theme-btn"
                      >
                        sign up
                      </Button>
                    </Form>
                  </div>
                  <div className="other-signup-wrapper">
                    <p>or sign up with:</p>
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
                      <button onClick={() => googleSignUp()}>
                        <img
                          src={theme === "light" ? GoogleIcon : GoogleIconDark}
                          alt=""
                        />{" "}
                        Google
                      </button>
                    </div>
                  </div>
                  <div className="agreement-wrapper">
                    <Checkbox />
                    <p>
                      agree to{" "}
                      <span onClick={checkHandler}>usage disclaimer</span>
                    </p>
                  </div>

                  <div className="additional-actions">
                    {" "}
                    already have an account? &nbsp;
                    {/* <Link to="/sign-in">Log in</Link> */}
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => navigate("/sign-in")}
                      className="light-theme-btn"
                    >
                      log in
                    </Button>
                    <div className="agreement-wrapper-mobile">
                      <Checkbox />
                      <p>
                        agree to{" "}
                        <span onClick={checkHandler}>usage disclaimer</span>
                      </p>
                    </div>
                  </div>
                  {/* <div className="google-wrapper">
            <img src={Google} alt="google" onClick={() => googleSignUp()} />
          </div> */}
                </div>
              ) : (
                <div className="usgae-card">
                  <UsageDisclaimerPopup />
                </div>
              )}
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
