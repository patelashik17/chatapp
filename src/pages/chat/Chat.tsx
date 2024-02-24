import { useCallback, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Button from "@/components/Button";
import DrawerAppBar from "@/components/DrawerAppBar";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";

export interface ISession {
  id: string;
  recent_chat_message: string;
  recent_chat_timestamp: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    const s = localStorage.getItem("sessions");
    if (s) {
      setSessions(JSON.parse(s));
    }
  }, []);

  const goToChatroom = useCallback((sessionId: string) => {
    return () => {
      navigate(`/room/${sessionId}`);
    };
  }, []);

  const startSession = useCallback(() => {
    makeRequest({
      url: "/chats/session",
      method: "post",
    })
      .then(({ data }) => {
        goToChatroom(data.session.id)();
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
  }, [goToChatroom]);

  const handleToasterClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {loading && <Loader />}
      <DrawerAppBar />
      <br />
      <br />
      <div className="sign-in-wrapper">
        <CustomToaster
          isShown={toasterState.isShown}
          handleClose={handleToasterClose}
          message={toasterState.message}
          messageType={toasterState.messageType}
        />

        <div className="signin-form-wrapper">
          <Box sx={{ p: 4, width: "100%" }}>
            <Box sx={{ width: "150px", marginLeft: "auto" }}>
              <Button onClick={startSession} variant="contained">
                Start chat
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {sessions &&
                  sessions.length > 0 &&
                  sessions.map((session: ISession) => {
                    const labelId = `checkbox-list-label-${session.id}`;

                    return (
                      <ListItem
                        key={session.id}
                        secondaryAction={
                          <IconButton
                            onClick={goToChatroom(session.id)}
                            edge="end"
                            aria-label="comments"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          id={labelId}
                          primary={session.recent_chat_message ?? "-"}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Chat;
