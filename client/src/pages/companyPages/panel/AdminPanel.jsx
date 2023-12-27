import React, { useState } from "react";
import Box from "@mui/material/Box";
import CustomAppBar from "./CustomAppBar";

const AdminPanel = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar />
      <div className="div"></div>
    </Box>
  );
};

export default AdminPanel;
