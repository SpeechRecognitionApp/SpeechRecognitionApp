// CustomHeader.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BankIcon from "@mui/icons-material/AccountBalance";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src="/banklogo.png" alt="Bank Logo" style={{ height: "70px" }} />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1 }}></Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
