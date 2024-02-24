import React, { useContext, useState } from "react";
import close from "../../assets/images/close.svg";
import closeDark from "../../assets/images/closeDark.svg";
import "./Style.scss";
import MiniLogoii from "../../assets/images/miniLogoii.svg";
import MiniLogoiiDark from "../../assets/images/miniLogoiiDark.svg";
import ThemeContext from "@/themeContext/themeContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useAxios from "axios-hooks";
import Button from "@/components/Button";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";

// import TipsSteps from "@/components/tipsSteps/TipsSTeps";
// import TipsSteps from "../../components/tipsSteps/TipsSTeps";

type tipsProps = {
  title: string;
  description: string;
  isShownCircle: boolean;
};

const TipsSteps = (props: tipsProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="tips-stepper">
        {props.isShownCircle && (
          <div
            className={theme === "light" ? "circle-light" : "circle-dark"}
          ></div>
        )}
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </>
  );
};

const Tips = () => {
  const { theme } = useContext(ThemeContext);
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });
  const [{ loading: registrationLoading }, updateRegistrationComplete] =
    useAxios(
      {
        method: "patch",
      },
      { manual: true }
    );
  const navigate = useNavigate();
  const [tipScreen, setTipScreen] = useState(0);
  const buttonHandler = () => {
    if (tipScreen === 3) {
      updateRegistrationComplete({
        url: `/user`,
        data: {},
        method: "patch",
      })
        .then((response) => {
          navigate("/dashboard");
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
      return;
    }
    setTipScreen((prev) => {
      return prev + 1;
    });
  };

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {registrationLoading && <Loader />}

      <div className="tips-wrapper">
        <CustomToaster
          isShown={toasterState.isShown}
          handleClose={handleToasterClose}
          message={toasterState.message}
          messageType={toasterState.messageType}
        />
        <div className="tips-inner-wrapper">
          <div className="logo">
            <Box sx={{ cursor: "pointer" }}>
              <img
                src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
                className="logo-icon"
                alt="logo"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </Box>

            <Box sx={{ cursor: "pointer" }}>
              <img
                src={theme === "light" ? close : closeDark}
                className="close-icon"
                alt="logo"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </Box>
          </div>
          <div className="tips-content">
            {tipScreen === 0 && (
              <TipsSteps
                title="your well-being is our top priority"
                isShownCircle={false}
                description="  If you're feeling severe distress or considering harmful actions,
        please seek immediate professional help. Gaiia is a supportive
        companion but is not a substitute for urgent care or professional
        help."
              />
            )}
            {tipScreen === 1 && (
              <TipsSteps
                isShownCircle={true}
                title="set clear intentions:"
                description="Before you start chatting, take a moment to identify what you're feeling and what you'd like to discuss. This can help guide the conversation."
              />
            )}
            {tipScreen === 2 && (
              <TipsSteps
                isShownCircle={true}
                title="honesty is key:"
                description="Gaiia is a judgment-free zone. To receive the best support, be open and honest about your feelings and concerns."
              />
            )}
            {tipScreen === 3 && (
              <TipsSteps
                isShownCircle={true}
                title="journey, not destination:"
                description="Healing and self-growth is a process. Celebrate small victories and remember that every conversation is a step forward."
              />
            )}

            <Button onClick={buttonHandler} loading={registrationLoading}>
              {tipScreen === 0 ? "I understand" : "okay"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tips;
