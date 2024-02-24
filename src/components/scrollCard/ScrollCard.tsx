import "./Style.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "@/themeContext/themeContext";
type scrollCardProps = {
  title: string;
  description: string;
  number: string;
  animationType: string;
  image?: string;
};

const ScrollCard = (props: scrollCardProps) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div
        data-aos={props.animationType}
        className={
          theme === "light"
            ? "card-container light-card-container"
            : "card-container dark-card-container"
        }
      >
        <p className="number">{props.number}</p>
        <div style={{ width: "100%" }}>
          <div className="title">
            <h3>{props.title}</h3>
            {props.image && <img src={props.image} alt="title" />}
          </div>
          <div className="show-card">
            <p className="description">{props.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollCard;
