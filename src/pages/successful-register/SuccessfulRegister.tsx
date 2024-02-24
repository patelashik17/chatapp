import "./Style.scss";
import Logoii from "../../assets/images/logoii.svg";
import darkLogoii from "../../assets/images/darkLogoii.svg";
import React, { useContext, useEffect } from "react";
import ThemeContext from "@/themeContext/themeContext";
import { useNavigate } from "react-router-dom";
import welcome from "../../assets/images/welcome.svg";
import welcome1 from "../../assets/images/welcome1.svg";
import welcomeDark from "../../assets/images/welcomedark.svg";
import welcomeDark1 from "../../assets/images/welcomedark1.svg";
import AOS from "aos";

const SuccessfulRegister = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init();
    setTimeout(() => {
      navigate("/tips");
    }, 2000);
  }, []);

  return (
    <>
      <div className="successful">
        <div className="successful-content">
          <h1 className="success-msg">success!</h1>
          <div className="animation-content">
            <div
              className="common-box common-box-right"
              data-aos="fade-right"
              data-aos-duration="3000"
              style={{ alignItems: "end" }}
            >
              <div className="center-content">
                <div className="circle">
                  <img
                    src={theme === "light" ? welcome1 : welcomeDark1}
                    alt=""
                  />
                </div>
                <div
                  className={theme === "light" ? "rectangle" : "rectangle-dark"}
                ></div>
              </div>
            </div>
            <div
              className="common-box common-box-left"
              data-aos="fade-left"
              data-aos-duration="3000"
              style={{ alignItems: "start" }}
            >
              <div className="center-content">
                <div className="circle">
                  <img src={theme === "light" ? welcome : welcomeDark} alt="" />
                </div>
                <div
                  className={theme === "light" ? "rectangle" : "rectangle-dark"}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfulRegister;
