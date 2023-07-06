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
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [mode, setMode] = useState({
    mode1: false,
    mode2: false,
    mode3: false,
  });

  const handleChange = (event) => {
    setMode({ ...mode, [event.target.name]: event.target.checked });
  };

  const handleConfirm = () => {
    // 这里你可以添加跳转到登录页面的代码
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
            maxWidth: 500,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Accessibility modes:
          </Typography>

          <FormControl sx={{ m: 3, width: "100%" }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography>Keyboard and mouse</Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={mode.mode1}
                  onChange={handleChange}
                  name="mode1"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography>Facial navigation </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={mode.mode2}
                  onChange={handleChange}
                  name="mode2"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography>Voice navigation</Typography>
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
            onClick={handleConfirm}
          >
            <Link to="/login">Confirm</Link>
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default WelcomePage;
