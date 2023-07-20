import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Grid, Box } from "@mui/material";
import KioskDashboard from "../components/DashboardItems";
import Footer from "../components/Footer";

function Dashboard() {
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
      <KioskDashboard />
      <AudioRecorder />
      <Footer />
    </Box>
  );
}

export default Dashboard;
