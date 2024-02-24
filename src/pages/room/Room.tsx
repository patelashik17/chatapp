import { useCallback, useContext, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Chatbox from "@/components/Chatbox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Style.scss";
import ThemeContext from "@/themeContext/themeContext";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";
import { getDateList } from "../dashboard/Dashboard";

const Room = () => {
  //  eslint-disable-next-line
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const navigate = useNavigate();
  let { sessionId } = useParams();
  const location = useLocation();
  const [chatData, setChatData] = useState({});
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  const getCurrentSessionChat = (previousChatList?: any) => {
    if (sessionId) {
      makeRequest({
        url: `chats/session/${sessionId}`,
        method: "get",
      })
        .then(({ data }) => {
          const updateChatData = data;
          if (previousChatList && previousChatList.length > 0) {
            updateChatData.session.chats = [
              ...previousChatList,
              ...updateChatData.session.chats,
            ];
          }
          setChatData(updateChatData);
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
    }
  };

  const getPreviousChatData = (getPreviousId: string) => {
    makeRequest({
      url: `chats/session/${getPreviousId}`,
      method: "get",
    })
      .then(({ data }) => {
        getCurrentSessionChat(data?.session?.chats);
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
  };

  useEffect(() => {
    if (location.state && location.state.isCallingConversion) {
      getCurrentSessionChat();
    } else {
      makeRequest({ url: "user" })
        .then((response) => {
          if (
            response.data &&
            response.data.user &&
            response.data.user.sessions &&
            response.data.user.sessions.length > 1
          ) {
            let getPreviousId;
            const list = getDateList(response.data.user.sessions, true);
            const previousMonth = getDateList(
              response.data.user.sessions,
              false
            );
            if (list.length > 0) {
              getPreviousId = list[list.length - 2]!.id;
            } else {
              getPreviousId = list[previousMonth.length - 2]!.id;
            }
            if (getPreviousId !== sessionId) {
              getPreviousChatData(getPreviousId);
            } else {
              getCurrentSessionChat();
            }
          } else {
            getCurrentSessionChat();
          }
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
          getCurrentSessionChat();
        });
    }
  }, []);

  const onClose = useCallback(
    () => {
      navigate(-1);
    },
    //  eslint-disable-next-line
    []
  );
  const { theme } = useContext(ThemeContext);

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {/* <DrawerAppBar /> */}

      {loading && <Loader />}

      <div
        className={
          theme === "light" ? "room-wrapper" : "room-wrapper room-wrapper-dark"
        }
      >
        <div className="room-inner-wrapper">
          <CustomToaster
            isShown={toasterState.isShown}
            handleClose={handleToasterClose}
            message={toasterState.message}
            messageType={toasterState.messageType}
          />
          <div className="chat-window">
            {sessionId && (
              <Chatbox
                onClose={onClose}
                sessionId={sessionId}
                chatData={chatData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
