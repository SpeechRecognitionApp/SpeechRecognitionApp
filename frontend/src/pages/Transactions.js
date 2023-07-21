import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import TransactionHistory from "../components/TransactionTable";
import { Box,Typography } from "@mui/material";

function TransactionsPage() {
  return (
    <Box sx={{
      display: "grid",
      backgroundColor: "#F5F5F9",
      gridTemplateRows: "auto 1fr auto",
      height: "100vh",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <Header />
      <Box  sx={{
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "auto auto auto", // Divide the container into three equal rows
          // Divide the container into three equal rows
          gap: "20px", // Add some gap between rows
          padding: "20px", // Add some padding around the Box
        }}>
        <Box
          sx={{
            padding: "20px",
          
            margin: "auto",
            
            
            textAlign: "center",
            lineHeight: "2",
         
          }}
        >
          <TitleBox buttonText="Transaction History"/> 
        </Box>
        <Box  sx={{
            height: 400,
            width: "90%",
            margin: "auto",
          }}>
          <TransactionHistory />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default TransactionsPage;
