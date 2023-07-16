import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CardSelector from "../components/CardSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TransferPage2() {
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "10px",
          width: "80%",
          margin: "40px auto",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          lineHeight: "2",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4">Pay Or Move Money</Typography>
      </Box>
      <Box sx={{ padding: "20px 0 0 60px" }}>
        {/* 标题 */}
        <Box sx={{ marginBottom: "20px" }}>
          <div>
            <CreditCard
              cardnumber={"4321123412341234"}
              cardname={"Morgan Bush"}
              carddate={"09/30"}
              cardcvc={"454"}
            />
          </div>
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
              borderRadius: "10px",
              width: "20%",
              marginTop: "30px",
            }}
          >
            Someone You've Paid Before
          </Button>
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
              borderRadius: "10px",
              width: "20%",
              marginTop: "30px",
            }}
          >
            A new person or company
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default TransferPage2;
