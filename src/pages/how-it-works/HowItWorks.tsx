import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "./Style.scss";
import LogoGaiia from "../../assets/images/logoGaiia.svg";
import LightLogoGaiia from "../../assets/images/lightgaiialogo.svg";
import chatsIcon from "../../assets/images/chatsIcon.svg";
import dayNightIcon from "../../assets/images/dayNightIcon.svg";
import chatIconDark from "../../assets/images/chatIIconDark.svg";
import dayNightIconDark from "../../assets/images/dayNightIconDark.svg";
import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ThemeContext from "@/themeContext/themeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <div className="how-it-works-container">
        <div className="how-it-works">
          <h1>how it works?</h1>
          <div
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
            className="steps-container"
          >
            <div className="steps">
              <div
                className={
                  theme === "light"
                    ? "number-circle circle-light"
                    : "number-circle circle-dark"
                }
              >
                1.
              </div>
              <div className="detail-box">
                <h1>
                  join
                  <img
                    src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                    alt="logo"
                  />
                </h1>
                <p>
                  <b>
                    Embark on your journey towards emotional well-being by
                    creating your Gaiia account.
                  </b>
                  Sharing more about yourself and the challenges you face allows
                  Gaiia to personalize the most effective way to guide you on
                  your unique path.
                </p>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-anchor-placement="bottom-bottom"
            className="steps-container-even"
          >
            {" "}
            <div className="steps">
              <div
                className={
                  theme === "light"
                    ? "number-circle circle-light"
                    : "number-circle circle-dark"
                }
              >
                2.
              </div>
              <div className="detail-box">
                <h1>initiate a dialogue:</h1>
                <p>
                  <b>
                    Once signed in, initiate a dialogue with Gaiia to open up
                    about your thoughts and emotions.
                  </b>
                  Gaiia is your attentive companion, providing guidance without
                  judgment.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-right" className="steps-container">
            <div className="steps">
              <div
                className={
                  theme === "light"
                    ? "number-circle circle-light"
                    : "number-circle circle-dark"
                }
              >
                3.
              </div>
              <div className="detail-box">
                <h1>engage in reflection:</h1>
                <p>
                  <b>
                    As the conversation progresses, Gaiia offers reflections and
                    insights based on your input.
                  </b>
                  Take the time to engage with these responses, exploring your
                  thoughts and feelings more deeply. Gaiia may recommend
                  self-care activities, techniques, or resources to help you
                  manage your emotions and thoughts. These suggestions can be
                  invaluable on your journey.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="steps-container-even">
            {" "}
            <div className="steps">
              <div
                className={
                  theme === "light"
                    ? "number-circle circle-light"
                    : "number-circle circle-dark"
                }
              >
                4.
              </div>
              <div className="detail-box">
                <h1>track your progress:</h1>
                <p>
                  <b>
                    Gaiia goes beyond individual sessions. It summarizes
                    previous conversations, allowing you to revisit and reflect
                    on your progress.
                  </b>
                  It also provides session feedback to help you evaluate your
                  emotional growth and understand your evolving needs.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-right" className="steps-container">
            {" "}
            <div className="steps">
              <div
                className={
                  theme === "light"
                    ? "number-circle circle-light"
                    : "number-circle circle-dark"
                }
              >
                5.
              </div>
              <div className="detail-box">
                <h1>
                  add
                  <img
                    src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                    alt="logo"
                  />{" "}
                  to your
                </h1>
                <h1>phone's home screen:</h1>
                <p>
                  <b>
                    Adding Gaiia to your phone's home screen makes it as easy as
                    a single tap to launch the platform whenever you need
                    support or guidance. Please see detailed instructions
                    below. 
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div className="join-content mobile-hide">
            <div className="join-bg-section"></div>
            <div className="join-section" onClick={() => navigate("/sign-up")}>
              <Button className="light-theme-btn">start your journey</Button>
            </div>
          </div>

          <h1 className="heading">we do care about you:</h1>
          <div className="third-section">
            <div className="text-box">
              <div className="title">
                <h1>professional support</h1>
                <img
                  src={theme === "light" ? chatsIcon : chatIconDark}
                  alt="chat-icon"
                />
              </div>
              <p>
                <b>
                  {" "}
                  While Gaiia offers valuable guidance, it's important to
                  recognize that it is not a substitute for professional
                  therapy.
                </b>{" "}
                If you feel the need for more comprehensive support, we
                encourage you to seek assistance from a licensed therapist.
              </p>
            </div>
            <div className="text-box">
              <div className="title">
                <h1>night and day mode</h1>
                <img
                  src={theme === "light" ? dayNightIcon : dayNightIconDark}
                  alt="day-night"
                />
              </div>
              <p>
                <b> A smoother experience with its night and day mode.</b>{" "}
                Whether you're seeking support in the evening or during the
                night, you can switch to the mode that suits your preference,
                enhancing your comfort and convenience.
              </p>
            </div>
          </div>

          <div className="fourth-section">
            <div
              className={theme === "light" ? "part-1" : "part-1 part1-dark-bg"}
            >
              <div>
                <h1>
                  add
                  <img
                    src={theme === "light" ? LightLogoGaiia : LogoGaiia}
                    alt="logo"
                  />
                  to your
                </h1>
                <h1> phone's home screen</h1>
              </div>

              <p>
                Accessing Gaiia is now more convenient than ever. Follow these
                <b>
                  {" "}
                  simple steps to add a web app button to your phone's home
                  screen:
                </b>
              </p>
            </div>
            <div className="part-2">
              <p className="show-in-mobile">
                Accessing Gaiia is now more convenient than ever. Follow these
                <b>
                  {" "}
                  simple steps to add a web app button to your phone's home
                  screen:
                </b>
              </p>
              <h1>for iOS: </h1>
              <p>(iPhone and iPad)</p>
            </div>
            <div className="part-3">
              <ul>
                <li>
                  Open <b>Safari</b> and navigate to the{" "}
                  <b>Gaiia web app page</b>.
                </li>
                <li>
                  Tap the <b>share icon</b> at the bottom of the screen (square
                  with an arrow pointing upwards).
                </li>
                <li>
                  Scroll down and select <b>"Add to Home Screen"</b>.
                </li>
                <li>
                  <b>Customize the name</b> for the app icon (e.g., "Gaiia") and
                  tap "Add".
                </li>
                <li>
                  A Gaiia app icon will now appear on your home screen for easy
                  access.
                </li>
              </ul>
              <h1>for Android:</h1>
            </div>
            <div className="part-4">
              <ul>
                <li>
                  Open your preferred <b>browser</b> and visit the{" "}
                  <b>Gaiia website</b>.
                </li>
                <li>
                  Tap the <b>three vertical dots</b> (menu) at the top right
                  corner of the screen.
                </li>
                <li>
                  Select <b>"Add to Home Screen"</b> from the dropdown menu.
                </li>
                <li>
                  A prompt will appear. <b>Customize the name</b> for the app
                  icon (e.g., "Gaiia") and tap <b>"Add"</b>.
                </li>
                <li>
                  You'll find the Gaiia app icon on your home screen for quick
                  access.
                </li>
              </ul>
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
          <Button>start your journey</Button>
        </div> */}

        <div className="join-content">
          <div
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="join-bg-section"
          ></div>
          <div className="join-section">
            <Button
              onClick={() => navigate("/sign-up")}
              className="light-theme-btn"
            >
              start your journey
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
