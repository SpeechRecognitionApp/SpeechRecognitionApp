import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import TitleBox from "../components/TitleBox";

function TransferPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/selectpayee");
  }

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
      <Box
        sx={{
          display: "grid", 
          gridTemplateRows: "1fr 1fr 1fr", 
          gap: "20px", 
          height: "100%", 
          padding: "20px", 
        }}
      >
        <Box
          sx={{
            padding: "20px",

            margin: "auto",

            textAlign: "center",
            lineHeight: "2",
          }}
        >
          <TitleBox buttonText="Choose A Card to Transfer from" />
        </Box>
        <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>
          <CardSelector />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              width: "20%",
              padding: "10px",
              margin: "auto",
              textAlign: "center",
              fontSize: 28,
            }}
            onClick={handleClick}
          >
            Select
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default TransferPage;
