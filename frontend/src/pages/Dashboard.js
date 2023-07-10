import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Grid from "@mui/material/Grid";
import KioskDashboard from "../components/DashboardItems";

function Dashboard() {
  return (
    <div>
      <Header/>
      <KioskDashboard/>
      <AudioRecorder/>
    </div>
  );
}

export default Dashboard;
