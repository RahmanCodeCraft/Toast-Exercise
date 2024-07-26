import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "./service/mockServer";
import Popup from "./Popup";
import Loader from "./Loader";
import UserTable from "./UserTable";

export default function Content() {
  const [notification, setNotification] = useState([]);
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedSubmissions();
  }, []);

  const fetchLikedSubmissions = async () => {
    try {
      const liked = await fetchLikedFormSubmissions();
      setLikedSubmissions(liked.formSubmissions);
    } catch (error) {
      console.error("Error fetching liked submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMessage((newSubmission) => {
      setNotification((prevNotifications) => [
        ...prevNotifications,
        { ...newSubmission, visible: true },
      ]);
    });
  }, []);

  const handleLikeSubmission = (submission) => {
    saveLikedFormSubmission(submission);
    setLikedSubmissions((prevLiked) => [...prevLiked, submission]);
    setNotification((prevNotifications) =>
      prevNotifications.map((toast) =>
        toast.id === submission.id ? { ...toast, visible: false } : toast
      )
    );
  };

  const handleDismissNotification = (id) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <div className="App">
        {notification.map((notification) => {
          if (!notification.visible) return null;
          return (
            <Popup
              key={notification.id}
              notification={notification}
              handleLikeSubmission={handleLikeSubmission}
              handleDismissNotification={handleDismissNotification}
            />
          );
        })}
        <div style={{ marginTop: "20px" }}>
          {loading ? (
            <Loader />
          ) : (
            <UserTable likedSubmissions={likedSubmissions} />
          )}
        </div>
      </div>
    </Box>
  );
}
