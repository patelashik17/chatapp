import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Drawer,
  Container,
  List,
  ListItemButton,
  ListItem,
} from "@mui/material";
import "./Style.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAxios from "axios-hooks";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";

import close from "../assets/images/close.svg";
import closeDark from "../assets/images/closeDark.svg";
import MiniLogoii from "../assets/images/miniLogoii.svg";
import MiniLogoiiDark from "../assets/images/miniLogoiiDark.svg";
import dayNightIcon from "../assets/images/dayNightIcon.svg";
import dayNightIconDark from "../assets/images/dayNightIconDark.svg";
import profileIcon from "../assets/images/profileIcon.svg";
import profileIconDark from "../assets/images/profileIconDark.svg";

import ThemeContext from "@/themeContext/themeContext";
import { useNavigate } from "react-router-dom";
import { IUserDetail } from "@/pages/dashboard/Dashboard";
import CustomToaster from "./CustomToaster";
import Loader from "./loader/loader";
const messages = [{ id: "a", text: "Hi there!", sender: "bot" }];

const scrollToBottom = (div: HTMLElement | null) => {
  setTimeout(() => {
    if (div) {
      div.scrollTop = div.scrollHeight + 1000;
    }
  }, 10);
};

export type Message = (typeof messages)[0];

const Chatbox = ({
  sessionId,
  onClose,
  chatData,
}: {
  sessionId: string;
  onClose: () => void;
  chatData: any;
}) => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [{ loading: endingChat }, callEndChat] = useAxios(
    {
      method: "patch",
    },
    { manual: true }
  );
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [toasterState, setToasterState] = React.useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  React.useEffect(() => {
    if (chatData?.session?.chats) {
      setMessages(chatData?.session?.chats);
      const div = document.getElementById("chat-box");
      scrollToBottom(div);
    }
  }, [chatData]);

  const addMessage = React.useCallback((m: Message) => {
    setMessages((prev) => prev.concat([m]));
  }, []);

  const sendMessage = React.useCallback(() => {
    addMessage({ id: uuidv4(), text: input, sender: "user" });
    setInput("");
    const div = document.getElementById("chat-box");
    scrollToBottom(div);

    makeRequest({
      url: "/chats",
      method: "post",
      data: {
        session_id: sessionId,
        message: input,
      },
    })
      .then(({ data }) => {
        addMessage({
          id: data.chat.id,
          text: data.chat.message,
          sender: "bot",
        });
        scrollToBottom(div);
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
  }, [sessionId, input]);

  const handleInputChange = React.useCallback((event: any) => {
    setInput(event.target.value);
  }, []);

  const formSubmit = React.useCallback((event: any) => {
    event.preventDefault();
  }, []);

  React.useEffect(() => {
    document.body.classList.add("chat-mobile-wrapper");

    return () => {
      document.body.classList.remove("chat-mobile-wrapper");
    };
  }, []);

  const endChat = React.useCallback(() => {
    callEndChat({
      url: `/chats/session/${sessionId}/end`,
    })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        onClose();
      });
  }, [onClose, sessionId]);
  const { theme, setAutoThemeMode } = useContext(ThemeContext);

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = "100%";
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

  const storedUserData = sessionStorage.getItem("userData");
  let userData;
  if (storedUserData !== null) {
    userData = JSON.parse(storedUserData);
  } else {
    console.error("userData not found in sessionStorage");
  }

  return (
    <Box
      sx={{
        height: "100svh",
        width: "80vw",
        display: "grid",
        bgcolor: "grey.200",
      }}
      className="chatbox-wrap"
    >
      <CustomToaster
        isShown={toasterState.isShown}
        handleClose={handleToasterClose}
        message={toasterState.message}
        messageType={toasterState.messageType}
      />

      {endingChat && <Loader />}

      <Box
        sx={{
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
          padding: "20px",
          width: "80vw",
          justifyContent: "space-between",
        }}
        className="header-box"
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box sx={{ cursor: "pointer" }} onClick={gotoDashboard}>
            <img
              src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
              className="logo-icon"
              alt="logo"
            />
          </Box>

          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setAutoThemeMode(false, theme === "light" ? "dark" : "light");
            }}
          >
            <img
              src={theme === "light" ? dayNightIcon : dayNightIconDark}
              alt="day-night"
              className="day-night"
            />
          </Box>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Box sx={{ cursor: "pointer" }} onClick={gotoDashboard}>
            <img
              src={theme === "light" ? profileIcon : profileIconDark}
              alt="day-night"
            />{" "}
            {userData?.name}
          </Box>
          <Box
            onClick={endChat}
            sx={{ p: 2, cursor: "pointer" }}
            className="end-session-btn-box"
          >
            <Button
              color="inherit"
              className="end-session-btn"
              onClick={endChat}
            >
              end session
            </Button>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginTop: "0px", paddingTop: "0px" }}
            >
              <MenuIcon sx={{ fontSize: "2rem" }} className="drawer-icon" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        id="chat-box"
        sx={{
          overflow: "auto",
          p: 2,
          height: "60vh",
        }}
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span className="typing-text">typing...</span>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Paper
                variant="outlined"
                className="bot-chat-bg"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  borderRadius: "20px 20px 20px 20px",
                }}
              >
                <Typography variant="body1">...</Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ pt: 2, pb: 2, backgroundColor: "background.default" }}>
        <form
          onSubmit={formSubmit}
          name="chat-input"
          target="#here"
          className="chat-input"
        >
          <Grid container spacing={0} className="input-container">
            <Grid item xs={9} className="input-grid ">
              <TextField
                size="small"
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                disabled={endingChat}
                value={input}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2} className="send-btn">
              <Button
                fullWidth
                disabled={input === ""}
                color="primary"
                type="submit"
                variant="contained"
                onClick={sendMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          display: "flex",
          padding: "20px",
          paddingTop: "0px",
        }}
        className="mobile-header-box"
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            display: "flex",
            gap: "20px",
          }}
        >
          <Box sx={{ cursor: "pointer" }} onClick={gotoDashboard}>
            <img
              src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
              className="logo-icon"
              alt="logo"
            />
          </Box>
          <div>
            <Box sx={{ cursor: "pointer" }} onClick={gotoDashboard}>
              <img
                src={theme === "light" ? profileIcon : profileIconDark}
                alt="day-night"
                className="logo-icon"
              />
              {userData?.name}
            </Box>
          </div>
        </Box>
        <Box
          onClick={endChat}
          sx={{ p: 2, cursor: "pointer" }}
          className="end-session-btn-box"
        >
          <Button color="inherit" className="end-session-btn" onClick={endChat}>
            end session
          </Button>
        </Box>
        <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ fontSize: "2rem" }} className="drawer-icon" />
          </IconButton>
        </Box>
      </Box>

      {/* <Box component="nav"> */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className={theme === "light" ? "theme--light" : "theme--dark"}
        sx={{
          display: { xs: "block", md: "block", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Box sx={{ maxHeight: "25px" }} className="drawer-logo">
            <Box
              component="img"
              src={theme === "light" ? MiniLogoii : MiniLogoiiDark}
              sx={{
                maxHeight: "25px",
              }}
              alt="logo"
            ></Box>
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
          </List>
        </Box>
        <img
          src={theme === "light" ? close : closeDark}
          alt=""
          className="drawer-close-icon"
          onClick={handleDrawerToggle}
        />
      </Drawer>
      {/* </Box> */}
    </Box>
  );
};

const Message = ({ message }: { message: any }) => {
  const isBot = message.sender === "bot" || message?.sent_by === 0;
  const { theme } = useContext(ThemeContext);
  const userBg = theme === "light" ? "circle-light" : "circle-dark";
  const userInfo: IUserDetail = JSON.parse(localStorage.getItem("user")!);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "column" : "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <Avatar className={isBot ? "bot-bg" : userBg}>
            {isBot ? <img src={MiniLogoii} /> : ""}
          </Avatar>
          <span className="user-name">
            {isBot
              ? "gaiia"
              : userInfo && userInfo.name
              ? userInfo.name
              : "user"}
          </span>
        </Box>

        <Paper
          variant="outlined"
          className={isBot ? "bot-chat-bg" : "user-chat-bg"}
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            borderRadius: isBot ? "20px 20px 20px 20px" : "20px 20px 20px 20px",
          }}
        >
          <Typography variant="body1">
            {message.text ?? message.message}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chatbox;
