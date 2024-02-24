import ThemeContext from "@/themeContext/themeContext";
import { Box, CircularProgress } from "@mui/material";
import React, { useContext } from "react";

const Loader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
        display: "flex",
        // display: endingChat ? "flex" : "none",
      }}
    >
      <CircularProgress
        sx={{ mb: 2 }}
        style={{ color: theme === "light" ? "#2d100a" : "#e4d2c4" }}
      />
      {/* Closing chat... */}
    </Box>
  );
};

export default Loader;
