import { useContext } from "react";
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
import Loader from "@/components/loader/loader";

const ResetPassword = () => {
  const { theme } = useContext(ThemeContext);
  const [{ loading: registrationLoading }] = useAxios(
    {
      method: "patch",
    },
    { manual: true }
  );
  const navigate = useNavigate();

  return (
    <>
      {registrationLoading && <Loader />}

      <div className="reset-password-wrapper">
        <div className="reset-password-inner-wrapper">
          <div className="logo">
            <Box sx={{ cursor: "pointer" }}>
              <img
                src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
                className="logo-icon"
                alt="logo"
                onClick={() => {
                  navigate("/sign-in");
                }}
              />
            </Box>

            <Box sx={{ cursor: "pointer" }}>
              <img
                src={theme === "light" ? close : closeDark}
                className="close-icon"
                alt="logo"
                onClick={() => {
                  navigate("/sign-in");
                }}
              />
            </Box>
          </div>
          <div className="reset-password-content">
            <div className="reset-password-inner-content">
              <h1>check your inbox</h1>
              <p>
                We've sent an email to the address you provided. Please check
                your inbox for a link to reset password
              </p>
            </div>

            <Button
              onClick={() => {
                navigate("/sign-in");
              }}
              loading={registrationLoading}
            >
              Ok
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
