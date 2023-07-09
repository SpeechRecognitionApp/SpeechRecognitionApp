import React from "react";
import Banking_Buttons from "../components/BankingButtons";
import AudioRecorder from "../components/AudioRecorder.js";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div>
      <Header />
      <Banking_Buttons />
      <AudioRecorder />
    </div>
  );
}

export default Dashboard;
