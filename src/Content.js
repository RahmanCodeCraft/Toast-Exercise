import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar, Button, IconButton } from "@mui/material";
import {
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "./service/mockServer";
import CloseIcon from "@mui/icons-material/Close";

export default function Content() {
  const [toasts, setToasts] = useState([]);
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  useEffect(() => {
    fetchLikedSubmissions();
  }, []);

  const fetchLikedSubmissions = async () => {
    try {
      const liked = await fetchLikedFormSubmissions();
      setLikedSubmissions(liked.formSubmissions);
    } catch (error) {
      console.error("Error fetching liked submissions:", error);
    }
  };

  useEffect(() => {
    onMessage((newSubmission) => {
      setToasts((prevToasts) => [
        ...prevToasts,
        { ...newSubmission, visible: true },
      ]);
    });
  }, []);

  const handleLikeSubmission = (submission) => {
    saveLikedFormSubmission(submission);
    setLikedSubmissions((prevLiked) => [...prevLiked, submission]);
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === submission.id ? { ...toast, visible: false } : toast
      )
    );
  };

  const handleDismissToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <div className="App">
        {toasts.map((toast) => {
          if (!toast.visible) return null;
          const { firstName, lastName, email } = toast.data;
          return (
            <Snackbar
              key={toast.id}
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
                    onClick={() => handleLikeSubmission(toast)}
                    color="primary"
                  >
                    Like
                  </Button>
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => handleDismissToast(toast.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
              onClose={() => handleDismissToast(toast.id)}
            />
          );
        })}
        <div>
          <h2>Liked Submissions</h2>
          <ul>
            {likedSubmissions.map((submission) => {
              const { firstName, lastName, email } = submission.data;
              return (
                <li
                  key={submission.id}
                >{`${firstName} ${lastName} having email ${email}`}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </Box>
  );
}
