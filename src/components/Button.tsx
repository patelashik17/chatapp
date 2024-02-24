import * as React from "react";
import MaterialButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

type ButtonProps = React.ComponentProps<typeof MaterialButton>;

const Button = styled(MaterialButton)<ButtonProps>(() => ({
  "&.MuiButton-contained": {
    "border-radius": "24px",
    width: "100%",
    "text-align": "center",
    padding: "14px 24px",
    "text-transform": "none",
    "font-weight": "600",
    height: "53px",
  },
  "&.MuiButton-contained:not(.Mui-disabled)": {
    background: "#000",
    color: "#fff",
  },
}));

export default Button;
