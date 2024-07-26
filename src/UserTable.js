import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

const UserTable = ({ likedSubmissions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
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
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
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
    </>
  );
};
export default UserTable;
