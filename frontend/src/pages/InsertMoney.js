import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Radio, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function InsertMoney() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/dashboard");
  }

  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#F5F5F9",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />

      {/* Main content */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Please Insert Your Money
        </Typography>
        <img
          src="/insertMoney.png"
          alt="Cash Image"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "20px",
            width: "20%",
            textAlign: "center",
            fontSize: 28,
          }}
          onClick={handleClick}
        >
          Confirm
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

export default InsertMoney;
