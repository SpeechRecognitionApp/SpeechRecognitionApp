// WelcomePage.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState({
    mode1: false,
    mode2: false,
    mode3: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setMode({
      mode1: false,
      mode2: false,
      mode3: false,
      [name]: e.target.checked,
    });
  };

  function handleClick() {
    navigate("/dashboard");
  }

  const handleConfirm = () => {
    console.log("Confirmed:", mode);
  };

  return (
    <div>
      <Header />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        bgcolor="#f4f6f8"
        sx={{ mt: 1 }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            width: "80%",
            maxHeight: 500,
            maxWidth: 500,
            borderRadius: 7,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Accessibility Modes:
          </Typography>

          <FormControl sx={{ m: 4, width: "100%" }}>
            <Grid
              container
              alignItems="center"
              spacing={5}
              // justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h6" style={{ marginLeft: "90px" }}>
                  Keyboard and mouse
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={mode.mode1}
                  onChange={handleChange}
                  name="mode1"
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              spacing={5}
              // justifyContent="space-between"
              marginTop={2}
            >
              <Grid item>
                <Typography
                  variant="h6"
                  style={{ marginLeft: "90px", marginRight: "42px" }}
                >
                  Facial navigation{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={mode.mode2}
                  onChange={handleChange}
                  name="mode2"
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              spacing={5}
              // justifyContent="space-between"
              marginTop={2}
            >
              <Grid item>
                <Typography
                  variant="h6"
                  style={{ marginLeft: "90px", marginRight: "48px" }}
                >
                  Voice navigation
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={mode.mode3}
                  onChange={handleChange}
                  name="mode3"
                />
              </Grid>
            </Grid>
          </FormControl>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#4caf50", color: "white" }}
            startIcon={<CheckCircleIcon />}
            onClick={handleClick}
            style={{ textTransform: "none" }}
          >
            Confirm
          </Button>
        </Paper>
      </Box>

      <Footer />
    </div>
  );
};

export default WelcomePage;
