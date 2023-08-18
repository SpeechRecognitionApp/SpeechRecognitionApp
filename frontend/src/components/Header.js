import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HeaderRecorder from "../AudioRecorders/HeaderRecording";

const Header = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/welcome");
  }

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  function returnHome() {
    navigate("/dashboard");
  }
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
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={handleClick}
            >
              <img
                src="/banklogo.png"
                alt="Bank Logo"
                style={{ height: "70px" }}
              />
            </IconButton>
          </Grid>

          <Grid item xs={8} container justifyContent="center">
            <IconButton color="inherit" aria-label="home" onClick={goBack}>
              <ArrowBackRoundedIcon sx={{ height: 30, width: 30 }} />
            </IconButton>

            <IconButton color="inherit" aria-label="home" onClick={returnHome}>
              <HomeRoundedIcon sx={{ height: 50, width: 50 }} />
            </IconButton>

            <IconButton color="inherit" aria-label="home" onClick={goForward}>
              <ArrowForwardRoundedIcon sx={{ height: 30, width: 30 }} />
            </IconButton>
          </Grid>

          <Grid item xs={2} container justifyContent="flex-end">
            <Typography variant="h5" sx={{ color: "#000000" }}>
              {format(currentTime, "HH:mm")}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <HeaderRecorder/>
    </AppBar>
  );
};

export default Header;
