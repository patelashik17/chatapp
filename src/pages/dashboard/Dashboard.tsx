import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "./Style.scss";
import { Button } from "@material-ui/core";
import ThemeContext from "@/themeContext/themeContext";
import { useCallback, useContext, useEffect, useState } from "react";
import plus from "../../assets/images/+.svg";
import plusDark from "../../assets/images/+dark.svg";
import chatsIcon from "../../assets/images/chatsIcon.svg";
import chatIconDark from "../../assets/images/chatIIconDark.svg";
import { ISession } from "../chat/Chat";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import { Box } from "@mui/material";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";

export interface IUserDetail {
  age: number;
  created_at: string;
  cultural_or_religious_background?: string;
  current_relationship_issues?: string;
  email: string;
  gender: string;
  id: string;
  is_registration_complete: string;
  mental_health_history: string;
  name: string;
  no_of_relationships: string;
  relationship_status: string;
  self_esteem_levels: string;
  sex_orientation: string;
  updated_at: string;
  sessions: ISession[];
}

export const getDateList = (
  sessions: ISession[],
  isToday: boolean
): ISession[] => {
  return isToday
    ? sessions.filter((sessionsItem) => {
        return (
          sessionsItem.recent_chat_message !== null &&
          new Date(sessionsItem.recent_chat_timestamp).toDateString() ===
            new Date().toDateString() // check date is current date
        );
      })
    : sessions.filter((sessionsItem) => {
        return (
          sessionsItem.recent_chat_message !== null &&
          new Date(sessionsItem.recent_chat_timestamp).toDateString() !==
            new Date().toDateString() // check date is not current date
        );
      });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const { theme } = useContext(ThemeContext);
  const [userDetails, setUserDetails] = useState<IUserDetail | null>(null);
  const [isVisibleConversationHistory, setVisibleConversationHistory] =
    useState<boolean>(false);
  const [todayDayList, setTodayDayList] = useState<ISession[]>([]);
  const [previousThirtyDayList, setPreviousThirtyDayList] = useState<
    ISession[]
  >([]);
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });

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

  useEffect(() => {
    makeRequest({ url: "user" })
      .then((response) => {
        if (
          response.data &&
          response.data.user &&
          response.data.user.sessions &&
          response.data.user.sessions.length > 0
        ) {
          setTodayDayList(getDateList(response.data.user.sessions, true));
          setPreviousThirtyDayList(
            getDateList(response.data.user.sessions, false)
          );
        }
        setUserDetails(response.data.user);
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setToasterState({
            isShown: true,
            message: "Something Went wrong",
            messageType: "error",
          });
        } else {
          setToasterState({
            isShown: true,
            message: error.response.data.error_message,
            messageType: "error",
          });
        }
      });
  }, []);

  const onLogOutClick = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {loading && <Loader />}

      <CustomToaster
        isShown={toasterState.isShown}
        handleClose={handleToasterClose}
        message={toasterState.message}
        messageType={toasterState.messageType}
      />

      <Header />
      <div className="dashboard">
        <div className="left-section">
          <div>
            <div
              className={theme === "light" ? "circle-light" : "circle-dark"}
            ></div>
            <h1>{userDetails && userDetails.name}</h1>
            <p>{userDetails && userDetails.email}</p>
          </div>
          <div>
            <Button className="chat-btn" onClick={() => startSession()}>
              {" "}
              {/* <img src={theme === "light" ? plusDark : plus} alt="" />  */}
              <div className="plus-sign"></div>
              let's chat
            </Button>
            <Button
              className="history-btn"
              onClick={() =>
                setVisibleConversationHistory(!isVisibleConversationHistory)
              }
            >
              Conversation History
            </Button>
            <Box sx={{ cursor: "pointer" }} onClick={() => onLogOutClick()}>
              <p>Log out</p>
            </Box>
          </div>
        </div>
        {isVisibleConversationHistory && (
          <div className="right-section">
            <div>
              <h5>Today</h5>
              {todayDayList && todayDayList.length > 0 ? (
                todayDayList.map((sessionsItem: ISession) => {
                  return (
                    <>
                      <p>
                        <img
                          src={theme === "light" ? chatsIcon : chatIconDark}
                          alt="chat-icon"
                        />{" "}
                        <span
                          onClick={() => navigate(`/room/${sessionsItem.id}`)}
                        >
                          {sessionsItem.recent_chat_message}
                        </span>
                      </p>
                    </>
                  );
                })
              ) : (
                <p>No Data</p>
              )}
            </div>

            <div>
              <h5>Previous 30 days</h5>
              {previousThirtyDayList && previousThirtyDayList.length > 0 ? (
                previousThirtyDayList.map((sessionsItem: ISession) => {
                  return (
                    <>
                      <p>
                        <img
                          src={theme === "light" ? chatsIcon : chatIconDark}
                          alt="chat-icon"
                        />{" "}
                        <span
                          onClick={() =>
                            navigate(`/room/${sessionsItem.id}`, {
                              state: { isCallingConversion: true },
                            })
                          }
                        >
                          {sessionsItem.recent_chat_message}
                        </span>
                      </p>
                    </>
                  );
                })
              ) : (
                <p>No Data</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="footer-dashboard">
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
