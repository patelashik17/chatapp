import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "./Style.scss";
import LogoGaiia from "../../assets/images/logoGaiia.svg";
import { Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "@/themeContext/themeContext";
import LightLogoGaiia from "../../assets/images/lightgaiialogo.svg";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });

  useEffect(() => {
    window.scrollTo(0, 0);
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
      {loading && <Loader />}
      <Header />
      <CustomToaster
        isShown={toasterState.isShown}
        handleClose={handleToasterClose}
        message={toasterState.message}
        messageType={toasterState.messageType}
      />

      <div className="about-us">
        <div
          className={
            theme === "light" ? "center-circle-light" : "center-circle-dark"
          }
        ></div>
        <div className="circle-bg">
          <div className="head-section">
            <h1>
              welcome to{" "}
              <img
                src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                alt=""
              />
            </h1>

            <h3> your compassionate AI therapy companion</h3>
            <p className="bold-p">
              At Gaiia, we understand that seeking therapeutic guidance is a
              personal journey, and we're here to support you every step of the
              way. Our AI therapy platform was born from a genuine need for
              accessible and confidential therapy advice, available whenever you
              need it.
            </p>
            <p className="light-p">
              We recognize that sometimes sharing your thoughts and feelings
              with another person can be challenging, which is why Gaiia
              provides you with a safe space to express yourself without any
              fear of judgment or disclosure.
            </p>
          </div>
        </div>

        <div className="card-section">
          <div className="card-maincontainer">
            <div className="card-title-dark">
              <div className="card-dark-bg"></div>
              <h1>accessible anytime, anywhere:</h1>
            </div>
            <div className="card-detail">
              <p>
                Life doesn't adhere to schedules, and neither do your thoughts
                and emotions.{" "}
                <b>
                  Gaiia is available around the clock, whenever you need a
                  listening ear or a moment of introspection.
                </b>{" "}
                Our platform is designed to fit seamlessly into your life,
                allowing you to engage in therapeutic conversations whenever
                it's most convenient for you.
              </p>
            </div>
            <div className="card-title-light">
              <div className="card-light-bg"></div>
              <h1>confidentiality at its core:</h1>
            </div>
            <div className="card-detail">
              <p>
                <b>Your privacy is our utmost priority.</b> Gaiia is built to be
                a haven for open expression, allowing you to share thoughts you
                might not feel comfortable discussing with another human. Rest
                assured that your conversations are held in strict confidence,
                and we do not share your personal information with any third
                parties. Your trust in our platform's confidentiality is the
                foundation of our service.
              </p>
            </div>
            <div className="card-title-dark">
              <div className="card-dark-bg"></div>
              <h1>unparalleled insights through AI:</h1>
            </div>
            <div className="card-detail">
              <p>
                <b>
                  Our use of artificial intelligence enables Gaiia to offer you
                  guidance that goes beyond what traditional therapy might
                  provide.
                </b>{" "}
                AI has the ability to access a vast repository of studies and
                data, allowing our platform to offer tailored advice and
                guidance in line with your unique personality and challenges.
                With Gaiia, you're tapping into a wealth of knowledge that can
                help you navigate your emotional landscape with greater clarity.
              </p>
            </div>
            <div className="card-title-light">
              <div className="card-light-bg"></div>
              <h1>a judgment-free zone:</h1>
            </div>
            <div className="card-detail">
              <p>
                We understand the importance of feeling understood and accepted.
                <b>
                  {" "}
                  With Gaiia, you'll never have to worry about being judged or
                  criticized.
                </b>{" "}
                Our AI platform's compassionate responses are designed to create
                an environment where you can explore your thoughts and feelings
                without the weight of external opinions.
                <b>
                  Your emotions are valid, and Gaiia is here to support you
                  without reservation.
                </b>
              </p>
              <p>
                <b>
                  Gaiia is more than just an AI therapy chatbot – it's a
                  companion on your journey toward emotional well-being
                </b>{" "}
                . We're committed to continuously improving our platform to
                better serve your needs and provide a safe, nurturing space for
                you to explore your thoughts and emotions.
              </p>
              <p>
                <b>
                  {" "}
                  Welcome to Gaiia, where therapy is accessible, confidential,
                  and free from judgment. Start your conversation today and
                  experience the power of AI-driven support like never before.
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* <div
          className={
            theme === "light"
              ? "join-section join-section-light"
              : "join-section"
          }
        >
          <Button>let’s chat</Button>
        </div> */}
        <div className="join-content">
          <div className="join-bg-section"></div>
          <div className="join-section">
            <Button
              onClick={() =>
                localStorage.getItem("token")
                  ? startSession()
                  : navigate("/sign-in")
              }
              className="light-theme-btn"
            >
              let’s chat
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
