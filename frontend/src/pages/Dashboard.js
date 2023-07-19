import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Grid from "@mui/material/Grid";
import KioskDashboard from "../components/DashboardItems";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div style={{ backgroundColor: "#F5F5F9 " }}>
      <Header />
      <KioskDashboard />
      <AudioRecorder />
      <Footer />
    </div>
  );
}

export default Dashboard;
