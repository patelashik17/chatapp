import React, { useContext, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoGaiia from "../../assets/images/logoGaiia.svg";
import LightLogoGaiia from "../../assets/images/lightgaiialogo.svg";
import MiniLogoii from "../../assets/images/miniLogoii.svg";
import plus from "../../assets/images/+.svg";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
// import HomeIcon from "@mui/icons-material/Home";
import "./Style.scss";
// import { MenuItem } from "@material-ui/core";
import close from "../../assets/images/close.svg";
import closeDark from "../../assets/images/closeDark.svg";
import ThemeContext from "@/themeContext/themeContext";
import useAxios from "axios-hooks";
import CustomToaster from "../CustomToaster";
import Loader from "../loader/loader";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  homeNav?: boolean;
}

const drawerWidth = 240;
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
];
//  [
//   { name: "Home", icon: <HomeIcon /> },
//   { name: "Profile", icon: <PersonIcon /> },
//   { name: "Logout", icon: <LogoutIcon /> },
// ];

export default function DrawerAppBar(props: Props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [toasterState, setToasterState] = React.useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  const { theme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // const onLogOutClick = () => {
  //   localStorage.clear();
  //   navigate("/sign-in");
  // };

  // const onProfileClick = () => {
  //   navigate("/profile");
  // };

  const onHomeClick = () => {
    if (token) navigate("/dashboard");
    else navigate("/");
  };

  const startSession = useCallback(() => {
    makeRequest({
      url: "/chats/session",
      method: "post",
    })
      .then(({ data }) => {
        navigate(`/room/${data?.session?.id}`);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setToasterState({
            isShown: true,
            message: "Something Went wrong",
            messageType: "error",
          });
        } else if (
          !error.response.data.error_message.includes("Rate limit reached")
        ) {
          setToasterState({
            isShown: true,
            message: error.response.data.error_message,
            messageType: "error",
          });
        }
      });
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {loading && <Loader />}

      <Box
        sx={{ display: "flex" }}
        className={
          props.homeNav ? "navbar-container" : "navbar-container header-bg"
        }
      >
        <CustomToaster
          isShown={toasterState.isShown}
          handleClose={handleToasterClose}
          message={toasterState.message}
          messageType={toasterState.messageType}
        />
        <CssBaseline />
        <AppBar component="nav" className="header">
          <Toolbar className="nav-toolbar">
            <Box className="logo" sx={{ mr: 2, display: { md: "none" } }}>
              {props.homeNav ? (
                <Box
                  component="img"
                  alt="logo"
                  src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                  onClick={onHomeClick}
                />
              ) : (
                <Box
                  component="img"
                  alt="logo"
                  className="logoii"
                  src={MiniLogoii}
                  onClick={onHomeClick}
                />
              )}
            </Box>
            {!props.homeNav && token && (
              <Button
                color="inherit"
                className="start-chat-btn desktop-hide dark-theme-btn"
              >
                {/* <img src={plus} alt="" /> */}
                <span className="plus-sign"></span>
                let's chat
              </Button>
            )}

            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { xs: "block", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
              <Box className="logo">
                {props.homeNav ? (
                  <Box
                    component="img"
                    alt="logo"
                    src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                    onClick={onHomeClick}
                  />
                ) : (
                  <Box
                    component="img"
                    alt="logo"
                    className="logoii"
                    src={MiniLogoii}
                    onClick={onHomeClick}
                  />
                )}
              </Box>
            </Box>

            <Box
              className={
                props.homeNav && !token ? "navRight" : "navRight margin-y-auto"
              }
              sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
            >
              {!props.homeNav && (
                <Button
                  color="inherit"
                  className="start-chat-btn dark-theme-btn"
                  onClick={() =>
                    localStorage.getItem("token")
                      ? startSession()
                      : navigate("/sign-in")
                  }
                >
                  {/* <img src={plus} alt="" /> */}
                  <span className="plus-sign"></span>
                  let's chat
                </Button>
              )}
              {navItems.map((item) => (
                <Button
                  key={item?.name}
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    if (item?.name === "Logout") {
                      localStorage.clear();
                    }
                    navigate(item.route);
                  }}
                >
                  {item?.name}
                </Button>
              ))}
              {props.homeNav && !token && (
                <>
                  <Button
                    color="inherit"
                    className="login-btn light-theme-btn"
                    onClick={() => navigate("/sign-in")}
                  >
                    log in
                  </Button>
                  <Button
                    color="inherit"
                    className="login-btn light-theme-btn"
                    onClick={() => navigate("/sign-up")}
                  >
                    sign-up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            className={theme === "light" ? "theme--light" : "theme--dark"}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              {/* <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography> */}
              <Box sx={{ maxHeight: "25px" }} className="logo">
                <Box
                  component="img"
                  sx={{
                    maxHeight: "25px",
                  }}
                  alt="logo"
                  src={theme === "light" ? LogoGaiia : LightLogoGaiia}
                />
              </Box>

              <List>
                {navItems.map((item) => (
                  <ListItem key={item?.name} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (item?.name === "Logout") {
                          localStorage.clear();
                        }
                        navigate(item.route);
                      }}
                    >
                      {item?.name}
                    </ListItemButton>
                  </ListItem>
                ))}
                {!localStorage.getItem("token") && (
                  <div className="menu-button">
                    <Button
                      color="inherit"
                      onClick={() => navigate("/sign-in")}
                      className="light-theme-btn"
                    >
                      Log in
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/sign-up")}
                      className="light-theme-btn"
                    >
                      sign up
                    </Button>
                  </div>
                )}
                {!props.homeNav && token && (
                  <Button
                    color="inherit"
                    className="lets-chat-btn dark-theme-btn"
                    onClick={() => startSession()}
                  >
                    {/* <img src={plus} alt="" /> */}
                    <span className="plus-sign"></span>
                    let's chat
                  </Button>
                )}
              </List>
            </Box>
            <img
              src={theme === "light" ? close : closeDark}
              alt=""
              className="close-icon"
              onClick={handleDrawerToggle}
            />
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
