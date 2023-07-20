import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "1fr 1fr 1fr", // Divide the container into three equal rows
          gap: "20px", // Add some gap between rows
          height: "100%", // Make this Box fill its parent
          padding: "20px", // Add some padding around the Box
        }}
      >
        <Box
          sx={{
            padding: "20px",
            width: "80%",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            lineHeight: "2",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4">Choose Your Card To Transfer</Typography>
        </Box>
        {/* 标题 */}
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
