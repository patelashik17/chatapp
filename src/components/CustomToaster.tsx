import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

interface CustomToaster {
  isShown: boolean;
  handleClose: () => void;
  message: string;
  messageType?: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomToaster = ({
  isShown,
  message,
  messageType = "success",
  handleClose,
}: CustomToaster) => {
  return (
    <>
      <Snackbar
        open={isShown}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomToaster;
