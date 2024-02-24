import "./Style.scss";
import React, { useContext } from "react";
import ThemeContext from "@/themeContext/themeContext";
import LogoGaiia from "../../assets/images/logoGaiia.svg";
import LightLogoGaiia from "../../assets/images/lightgaiialogo.svg";
import Logoii from "../../assets/images/logoii.svg";
import darkLogoii from "../../assets/images/darkLogoii.svg";
import footerLogo from "../../assets/images/footerLogo.svg";
import footerLogoDark from "../../assets/images/footerLogoDark.svg";
import { List, ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "about us", route: "/about-us" },
  {
    name: "how it works",
    route: "/how-it-works",
  },
  {
    name: "contact us",
    route: "/contact-us",
  },
  {
    name: "privacy policy",
    route: "/privacy-policy",
  },
  {
    name: "terms & conditions",
    route: "/terms-condition",
  },
  {
    name: "usage disclaimer",
    route: "/usage-disclaimer",
  },
];

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="footer-container">
        <img
          src={theme === "light" ? LightLogoGaiia : LogoGaiia}
          alt=""
          className="mobile-show-img"
        />
        <div className="footer-inner-container">
          <div className="footer-left">
            <img
              src={theme === "light" ? LightLogoGaiia : LogoGaiia}
              alt=""
              className="mobile-hidden-img"
            />
            <div>
              {/* <p>+44 7884 085000</p> */}
              <p>info@gaiia.chat</p>
            </div>

            <span>
              © 2023 GAIIA <br /> All rights reserved.
            </span>
          </div>
          <div className="footer-center">
            <img src={theme === "light" ? Logoii : darkLogoii} alt="" />
          </div>
          <div className="footer-right">
            <List className="list-items">
              {navItems.map((item) => (
                <a
                  onClick={() => {
                    navigate(item.route);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </List>
          </div>
        </div>
        <div className="footer-center-mobile">
          <img src={theme === "light" ? footerLogo : footerLogoDark} alt="" />
        </div>
      </div>
    </>
  );
};

export default Footer;
