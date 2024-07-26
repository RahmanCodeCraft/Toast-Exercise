import React from "react";
import Typography from "@mui/material/Typography";
import { Snackbar, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const Popup = ({
  notification,
  handleLikeSubmission,
  handleDismissNotification,
}) => {
  if (!notification.visible) return null;
  const { firstName, lastName, email } = notification.data;
  return (
    <Snackbar
      key={notification.id}
      open={true}
      message={
        <div>
          <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">
            {`${email} just submitted a form!`}
          </Typography>
        </div>
      }
      action={
        <Box display="flex" alignItems="center">
          <Button
            onClick={() => handleLikeSubmission(notification)}
            color="primary"
          >
            Like
          </Button>
          <IconButton
            size="small"
            color="inherit"
            onClick={() => handleDismissNotification(notification.id)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      }
      onClose={() => handleDismissNotification(notification.id)}
    />
  );
};
export default Popup;
