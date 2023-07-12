import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TransferPage() {
  return (
    <>
      <Header />
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4">Choose Your Card</Typography>
      </Box>
      <Box sx={{ padding: "20px 0 0 60px" }}>
        {/* 标题 */}

        <Box sx={{ marginBottom: "20px" }}>
          <CardSelector />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h4">Transfer To:</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: "10px", width: "250px", marginRight: "50px" }}
          >
            Someone Paid Before
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginBottom: "10px", width: "250px", marginLeft: "50px" }}
          >
            New Person
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default TransferPage;
