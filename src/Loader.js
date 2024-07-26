import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <CircularProgress />
  </Box>
);
export default Loader;
