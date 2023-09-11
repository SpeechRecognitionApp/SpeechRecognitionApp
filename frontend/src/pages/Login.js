import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./login.css";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
    >
      {loading && <CircularProgress />}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <Box mb={2}>
          <img src={"/banklogo.png"} className="Logo" alt="Logo" />
        </Box>
        <Box component="form" onSubmit={onFinish} width="100%">
          <TextField
            name="email"
            placeholder="Email Address"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            required
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontFamily="sans-serif"
            sx={{ mb: 2 }}
          >
            <Link to="/forgotPassword" color="secondary">
              Forgot Password?
            </Link>
            <Link to="/register" color="secondary">
              Create Your Account
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            <Link to="/dashboard" color="secondary">
              Login
            </Link>
          </Button>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/" color="secondary">
              Back to Welcome Page
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
