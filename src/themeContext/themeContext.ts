import React from "react";

interface InitialTheme {
  theme: string;
  setTheme: (theme: string) => void;
  setAutoThemeMode: (autoTheme: boolean, theme?: string) => void;
}

const hours = new Date().getHours();
let darkMode = hours < 7 || hours > 17 ? "dark" : "light";

export const initialThemeState = {
  theme: darkMode,
  setTheme: () => null,
  setAutoThemeMode: () => null,
};

const ThemeContext = React.createContext<InitialTheme>(initialThemeState);
export default ThemeContext;
