import Header from "@/components/header/Header";
import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Style.scss";
import ScrollCard from "@/components/scrollCard/ScrollCard";
import Box from "@mui/material/Box";
import LogoGaiia from "../../assets/images/logoGaiia.svg";
import LightLogoGaiia from "../../assets/images/lightgaiialogo.svg";
import { Button } from "@material-ui/core";
import Footer from "@/components/footer/Footer";
import Heart from "../../assets/images/heart.svg";
import CLock from "../../assets/images/clock.svg";
import Hidden from "../../assets/images/hidden.svg";
import ThemeContext from "@/themeContext/themeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import WelcomeAnimation from "@/components/welcome-animation/WelcomeAnimation";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import CustomToaster from "@/components/CustomToaster";
import { useTypewriter } from "react-simple-typewriter";
import TypeWriteAnimationText from "@/components/TypeWriteAnimationText";
import Loader from "@/components/loader/loader";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  const [isShownTypingAnimation, setShownTypingAnimation] = useState(false);
  const [isShownAnimation, setShownAnimation] = useState(false);
  const [isTypingDone, setTypingDone] = useState(false);

  useEffect(() => {
    // This logic used for reloop of typing effect
    if (!isShownAnimation && !isTypingDone) {
      return;
    }
    setShownAnimation(true);
    setTypingDone(false);
    setTimeout(() => {
      setShownTypingAnimation(true);
    }, 3500);
  }, [isTypingDone, isShownAnimation]);

  // const handleTypeDone = () => {
  //   setShownAnimation(false);
  //   setTypingDone(true);
  //   setShownTypingAnimation(false);
  // };

  useEffect(() => {
    AOS.init();
    setTimeout(() => {
      setIsLoadingPage(false);
      setShownAnimation(true);
    }, 3000);
  }, []);

  const startSession = useCallback(() => {
    makeRequest({
      url: "/chats/session",
      method: "post",
    })
      .then(({ data }) => {
        navigate(`/room/${data?.session?.id}`);
      })

      .catch((error) => {
        if (error.response.status === 500) {
          setToasterState({
            isShown: true,
            message: "Something Went wrong",
            messageType: "error",
          });
        } else if (
          !error.response.data.error_message.includes("Rate limit reached")
        ) {
          setToasterState({
            isShown: true,
            message: error.response.data.error_message,
            messageType: "error",
          });
        }
      });
  }, []);

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {isLoadingPage ? (
        <WelcomeAnimation />
      ) : (
        <>
          {loading && <Loader />}

          <Header homeNav={true} />
          <CustomToaster
            isShown={toasterState.isShown}
            handleClose={handleToasterClose}
            message={toasterState.message}
            messageType={toasterState.messageType}
          />
          <div className="home">
            <div className="first-section">
              <div className="left-side">
                <h1 className="intro-heading">
                  Your gentle AI companion for a balanced self
                </h1>
                <Button
                  className="chat-box-left light-theme-btn"
                  onClick={() => navigate("/sign-up")}
                >
                  start your journey
                </Button>
              </div>

              <div className="right-side">
                {isShownAnimation && (
                  <div className="right-side-content">
                    <div
                      className="gaiie-textbox"
                      data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-duration="1500"
                      data-aos-delay="1000"
                    >
                      <span>gaiia</span>
                      <p className="chat-box-white">How can I help you?</p>
                    </div>
                    <div
                      className="user-textbox"
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                      data-aos-delay="3000"
                    >
                      <span>adam</span>
                      <p className="chat-box">
                        {isShownTypingAnimation ? (
                          <>
                            &nbsp;
                            <TypeWriteAnimationText
                            // handleTypeDone={handleTypeDone}
                            />
                          </>
                        ) : (
                          <>&nbsp;</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={
                  theme === "light"
                    ? "center-circle center-circle-light"
                    : "center-circle center-circle-dark"
                }
              >
                {/* <img src={mainGradient} alt="" className="full-circle" /> */}
                {/* <img
              src={theme === "light" ? halfGradient : halfGradientDark}
              alt=""
              className="half-circle"
            /> */}
              </div>
            </div>
            <Box>
              <Box
                className="card-section"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "90px",
                }}
              >
                <ScrollCard
                  animationType="fade-right"
                  title={"privacy first"}
                  image={Hidden}
                  number="1."
                  description="Your privacy is paramount. Our platform ensures your data is encrypted and confidential."
                />

                <ScrollCard
                  animationType="fade-left"
                  title={"empathetic AI"}
                  image={Heart}
                  number="2."
                  description="Gaiia utilizes advanced algorithms to discern human emotions, enabling empathetic interactions tailored to each individual's feelings."
                />
                <ScrollCard
                  animationType="fade-right"
                  title={"available 24/7"}
                  image={CLock}
                  number="3."
                  description="Therapeutic support is available at your convenience. Chat when it suits you."
                />
                <ScrollCard
                  animationType="fade-left"
                  title={"dynamic therapy fusion"}
                  number="4."
                  description="Gaiia utilizes a dynamic fusion of various therapy methodologies, adapting in real-time to align with an individual's specific issues and mental state."
                />
              </Box>
            </Box>

            <div className="join-content">
              <div
                data-aos="zoom-in"
                data-aos-duration="2000"
                className="join-bg-section"
              ></div>
              <div className="join-section">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "20px",
                  }}
                >
                  <h2>join</h2>
                  <img
                    src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                    alt=""
                  />
                  <h2>today</h2>
                </Box>
                <Button
                  className="light-theme-btn"
                  onClick={() =>
                    localStorage.getItem("token")
                      ? startSession()
                      : navigate("/sign-in")
                  }
                >
                  let’s chat
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
