import "./Style.scss";
import ThemeContext from "@/themeContext/themeContext";
import React, { useContext } from "react";

type tipsProps = {
  title: string;
  description: string;
};

const TipsSteps = (props: tipsProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="tips-stepper">
        <div
          className={theme === "light" ? "circle-light" : "circle-dark"}
        ></div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default TipsSteps;
