// CustomHeader.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BankIcon from "@mui/icons-material/AccountBalance";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        boxShadow: "0px 3px 5px 2px rgba(0, 0, 0, 0.3)", // Red shadow
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#FFFFFF",
        }}
      >
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src="/banklogo.png" alt="Bank Logo" style={{ height: "70px" }} />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            marginRight: "140px",
            color: "#000000",
          }}
        >
          Caledonian Road Branch
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#000000",
          }}
        >
          {format(currentTime, "HH:mm")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
