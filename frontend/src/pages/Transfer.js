import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function TransferPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transfer2");
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "20px",
          width: "80%",
          margin: "40px auto",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          lineHeight: "2",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4">Choose Your Card</Typography>
      </Box>
      <Box>
        {/* 标题 */}
        <Box sx={{ marginTop: "80px", marginBottom: "20px" }}>
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
              marginTop: "30px",
              textAlign: "center",
              fontSize: 28,
            }}
            onClick={handleChange}
          >
            Select
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default TransferPage;
