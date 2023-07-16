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
    <div>
      <Header />
      <KioskDashboard />
      <AudioRecorder />
      <Footer />
    </div>
  );
}

export default Dashboard;
