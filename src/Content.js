import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from "./service/mockServer";
import Popup from "./Popup";
import TablePagination from "@mui/material/TablePagination";

export default function Content() {
  const [notification, setNotification] = useState([]);
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      prevNotifications.filter((toast) => toast.id !== id)
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {likedSubmissions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((submission, index) => {
                    const { firstName, lastName, email } = submission.data;
                    return (
                      <TableRow
                        key={submission.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                          "&:hover": {
                            backgroundColor: "#e0f7fa",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>{firstName}</TableCell>
                        <TableCell>{lastName}</TableCell>
                        <TableCell>{email}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={likedSubmissions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </Box>
  );
}
