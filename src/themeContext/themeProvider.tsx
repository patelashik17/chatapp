import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "./themeContext";

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<any>(initialThemeState.theme);
  useEffect(
    () => {
      setAutoThemeMode(true);
    },
    //  eslint-disable-next-line
    []
  );

  // set auto change theme and disable timer
  let timer: any = "";
  const setAutoThemeMode = (value: boolean, updatedTheme?: string) => {
    if (value) {
      timer = setInterval(() => {
        const hours = new Date().getHours();
        // 6PM to 6AM dark theme class added with this condition
        let darkMode = hours < 7 || hours > 17 ? "dark" : "light";
        setTheme(darkMode);
      }, 1000);
    }
    if (!value) {
      clearInterval(timer);
      timer = undefined;
      if (updatedTheme) setTheme(updatedTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setAutoThemeMode }}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
