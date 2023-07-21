import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Grid, Box, TextField, Button, Container } from "@mui/material";
import KioskDashboard from "../components/DashboardItems";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <Box sx={{
      display: "grid",
      backgroundColor: "#F5F5F9",
      gridTemplateRows: "auto 1fr auto",
      height: "100vh",
      flexDirection: "column",
      overflow: "hidden",
    }}>
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#F5F5F9",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        flexDirection: "column",
        // overflow: "hidden",
      }}
    >
      <Header />
      <Box sx={{
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "auto auto auto", // Divide the container into three equal rows
          gap: "20px", // Add some gap between rows
          padding: "20px", // Add some padding around the Box
        }}>
          <Box  sx={{ marginTop: "auto", marginBottom: "auto" }}> <KioskDashboard /></Box>
      <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}> <AudioRecorder /></Box>
      
      </Box>
      <Footer />
    </Box>
  );
}

export default Dashboard;
